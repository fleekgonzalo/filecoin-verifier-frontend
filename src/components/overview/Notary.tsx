import React, { Component } from 'react';
import { Data } from '../../context/Data/Index';
import AddClientModal from '../../modals/AddClientModal';
import AddVerifierModal from '../../modals/AddVerifierModal';
// @ts-ignore
import { ButtonPrimary, dispatchCustomEvent, ButtonSecondary } from "slate-react-system";
import { bytesToiB, anyToBytes } from "../../utils/Filters"
import BigNumber from 'bignumber.js'
// @ts-ignore
import LoginGithub from 'react-login-github';
import { config } from '../../config'
import WarnModal from '../../modals/WarnModal';
import WarnModalVerify from '../../modals/WarnModalVerify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { tableElementFilter } from '../../utils/SortFilter';
import Pagination from '../Pagination';
import history from '../../context/History'



type NotaryStates = {
    tabs: string
    selectedTransactions: any[]
    selectedClientRequests: any[]
    selectedLargeClientRequests: any[]
    sortOrderVerified: number,
    orderByVerified: string,
    refVerified: any,
    regLargePublic: any,
    sortOrderLargePublic: number,
    orderByLargePublic: string,
    sortOrderPublic: number,
    orderByPublic: string,
    refPublic: any
}

type NotaryProps = {
    clients: any[]
    searchString: string
}

export default class Notary extends Component<NotaryProps, NotaryStates> {
    public static contextType = Data

    verifiedClientsColums = [
        { id: "verified", value: "ID" },
        { id: "key", value: "Address" },
        { id: "datacap", value: "Datacap" },
    ]

    publicRequestColums = [
        { id: "name", value: "Client" },
        { id: "address", value: "Address" },
        { id: "datacap", value: "Datacap" },
        { id: "audittrail", value: "Audit Trail" }
    ]

    largeRequestColums = [
        { id: "name", value: "Client" },
        { id: "address", value: "Address" },
        { id: "datacap", value: "Datacap" },
        { id: "audittrail", value: "Audit Trail" }
    ]

    state = {
        selectedTransactions: [] as any[],
        selectedClientRequests: [] as any[],
        selectedLargeClientRequests: [] as any[],
        tabs: '1',
        sortOrderVerified: -1,
        orderByVerified: "name",
        refVerified: {} as any,
        sortOrderPublic: -1,
        orderByPublic: "name",
        sortOrderLargePublic: -1,
        orderByLargePublic: "name",
        refPublic: {} as any,
        regLargePublic: {} as any
    }

    componentDidMount() {
    }


    showVerifiedClients = async () => {
        this.setState({ tabs: "2" })
    }

    showClientRequests = async () => {
        this.setState({ tabs: "1" })
    }

    showLargeRequests = async () => {
        this.setState({ tabs: "3" })
    }

    onRefVerifiedChange = (refVerified: any) => {
        this.setState({ refVerified });
    };

    onRefPublicChange = (refPublic: any) => {
        this.setState({ refPublic });
    };

    onRefLargePublicChange = (regLargePublic: any) => {
        this.setState({ regLargePublic });
    };

    requestDatacap = () => {

        dispatchCustomEvent({
            name: "create-modal", detail: {
                id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
                modal: <AddClientModal />
            }
        })
    }

    verifyNewDatacap = () => {

        if (this.state.selectedClientRequests.length === 0 || this.state.selectedClientRequests.length > 1) {
            dispatchCustomEvent({
                name: "create-modal", detail: {
                    id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
                    modal: <WarnModal message={'Please select only one address'} />
                }
            })
        } else {
            const selected = this.state.selectedClientRequests[0]
            this.setState({
                selectedClientRequests: []
            })
            dispatchCustomEvent({
                name: "create-modal", detail: {
                    id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
                    modal: <AddClientModal newDatacap={true} clientRequest={this.context.clientRequests} selected={selected} />
                }
            })
        }
    }

    showWarnVerify = async (e: any, origin: string) => {
        await e.preventDefault()
        dispatchCustomEvent({
            name: "create-modal", detail: {
                id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
                modal: <WarnModalVerify
                    clientRequests={origin === 'Notary' ? this.context.clientRequests : []}
                    selectedClientRequests={origin === 'Notary' ? this.state.selectedClientRequests : []}
                    onClick={origin === 'Notary' ? this.verifyClients.bind(this) : origin === 'newDatacap' ? this.verifyNewDatacap.bind(this) : this.requestDatacap.bind(this)}
                    origin={origin === 'Notary' ? 'Notary' : "single-message"}
                />
            }
        })
    }

    verifyClients = async () => {

        dispatchCustomEvent({ name: "delete-modal", detail: {} })

        for (const request of this.context.clientRequests) {
            if (this.state.selectedClientRequests.includes(request.number)) {
                try {
                    const datacap = anyToBytes(request.data.datacap)
                    console.log('datacap', datacap)
                    let address = request.data.address
                    if (address.length < 12) {
                        address = await this.context.wallet.api.actorKey(address)
                    }
                    let messageID
                    if(this.context.wallet.multisig){
                        messageID = await this.context.wallet.api.multisigVerifyClient(this.context.wallet.multisigID, address, BigInt(datacap), this.context.wallet.walletIndex)
                    } else {
                        messageID = await this.context.wallet.api.verifyClient(address, BigInt(datacap), this.context.wallet.walletIndex)
                    }
                    // github update
                    this.context.updateGithubVerified(request.number, messageID, address, request.data.datacap)

                    // send notifications
                    this.context.wallet.dispatchNotification('Verify Client Message sent with ID: ' + messageID)
                    this.context.loadClientRequests()
                } catch (e) {
                    this.context.wallet.dispatchNotification('Verification failed: ' + e.message)
                    console.log(e.stack)
                }
            }
        }
    }

    selectRow = (transactionId: string) => {
        let selectedTxs = this.state.selectedTransactions
        if (selectedTxs.includes(transactionId)) {
            selectedTxs = selectedTxs.filter(item => item !== transactionId)
        } else {
            selectedTxs.push(transactionId)
        }
        this.setState({ selectedTransactions: selectedTxs })
    }

    selectClientRow = (number: string) => {
        let selectedTxs = this.state.selectedClientRequests
        if (selectedTxs.includes(number)) {
            selectedTxs = selectedTxs.filter(item => item !== number)
        } else {
            selectedTxs.push(number)
        }
        this.setState({ selectedClientRequests: selectedTxs })
    }

    selectLargeClientRow = (number: string) => {
        let selectedTxs = this.state.selectedLargeClientRequests
        if (selectedTxs.includes(number)) {
            selectedTxs = selectedTxs.filter(item => item !== number)
        } else {
            selectedTxs.push(number)
        }
        this.setState({ selectedLargeClientRequests: selectedTxs })
    }

    proposeVerifier = async () => {
        dispatchCustomEvent({
            name: "create-modal", detail: {
                id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
                modal: <AddVerifierModal />
            }
        })
    }

    orderVerified = async (e: any) => {
        const { orderBy, sortOrder } = await this.context.sortClients(e, this.state.orderByVerified, this.state.sortOrderVerified)
        this.setState({ orderByVerified: orderBy, sortOrderVerified: sortOrder })
    }

    orderPublic = async (e: any) => {
        const { orderBy, sortOrder } = await this.context.sortRequests(e, this.state.orderByPublic, this.state.sortOrderPublic)
        this.setState({ orderByPublic: orderBy, sortOrderPublic: sortOrder })
    }

    orderLargePublic = async (e: any) => {
        const { orderBy, sortOrder } = await this.context.sortRequests(e, this.state.orderByLargePublic, this.state.sortOrderLargePublic)
        this.setState({ orderByLargePublic: orderBy, sortOrderLargePublic: sortOrder })
    }

    timeout(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }

    showClientDetail(e: any) {
        const listRequestFiltered = this.context.clientRequests.filter((element: any) => tableElementFilter(this.props.searchString, element.data) === true)
            .filter((_: any, i: any) => this.state.refPublic?.checkIndex(i))

        const client = listRequestFiltered[e.currentTarget.id].data.name
        const user = listRequestFiltered[e.currentTarget.id].owner
        const address = listRequestFiltered[e.currentTarget.id].data.address
        const datacap = listRequestFiltered[e.currentTarget.id].data.datacap


        history.push('/client', { client, user, address, datacap })

    }

    handleSubmitApproveSign = async () => {
        // dispatchCustomEvent({ name: "delete-modal", detail: {} })
        // this.setState({ approveLoading: true })
        // loop over selected rows
        // const multisigInfo = await this.context.wallet.api.multisigInfo(config.lotusNodes[this.context.wallet.networkIndex].rkhMultisig)
        /*
        for (const request of this.context.verifierAndPendingRequests) {
            if (this.context.selectedNotaryRequests.includes(request.id)) {
                const messageIds: any[] = []
                var commentContent = ''
                var label = ''
                let filfox = ''
                try {
                    if (request.proposed === true) {
                        // for each tx
                        for (const tx of request.txs) {
                            let messageID = tx.datacap === 0 ?
                                await this.context.wallet.api.removeVerifier(tx.verifier, tx.signer, tx.id, this.context.wallet.walletIndex)
                                :
                                await this.context.wallet.api.approveVerifier(tx.verifier, BigInt(tx.datacap), tx.signer, tx.id, this.context.wallet.walletIndex);
                            messageIds.push(messageID)
                            this.context.wallet.dispatchNotification('Accepting Message sent with ID: ' + messageID)
                            filfox += `#### You can check the status of the message here: https://filfox.info/en/message/${messageID}\n`
                        }
                        // comment to issue
                        commentContent = `## The request has been signed by a new Root Key Holder\n#### Message sent to Filecoin Network\n>${messageIds.join()}\n${filfox}`
                        label = 'status:AddedOnchain'
                    } else {
                        let filfox = ''
                        for (let i = 0; i < request.datacaps.length; i++) {
                            if (request.datacaps[i] && request.addresses[i]) {
                                const datacap = anyToBytes(request.datacaps[i])
                                let address = request.addresses[i]
                                console.log("request address: " + address)
                                console.log("request datacap: " + request.datacaps[i])
                                console.log("datacap: " + datacap)

                                if (address.startsWith("t1") || address.startsWith("f1")) {
                                    address = await this.context.wallet.api.actorAddress(address)
                                    console.log("getting t0/f0 ID. Result of  actorAddress method: " + address)
                                }

                                console.log("address to propose: " + address)

                                let messageID = datacap === 0 ?
                                    await this.context.wallet.api.proposeRemoveVerifier(address, this.context.wallet.walletIndex)
                                    :
                                    await this.context.wallet.api.proposeVerifier(address, BigInt(datacap), this.context.wallet.walletIndex)

                                console.log("messageID: " + messageID)
                                messageIds.push(messageID)
                                this.context.wallet.dispatchNotification('Accepting Message sent with ID: ' + messageID)
                                filfox += `#### You can check the status of the message here: https://filfox.info/en/message/${messageID}\n`
                            }
                        }
                        commentContent = `## The request has been signed by a new Root Key Holder\n#### Message sent to Filecoin Network\n>${messageIds.join()}\n ${filfox}`
                        label = config.lotusNodes[this.context.wallet.networkIndex].rkhtreshold > 1 ? 'status:StartSignOnchain' : 'status:AddedOnchain'
                    }
                    await this.context.github.githubOctoGenericLogin()
                    if (commentContent != '') {
                        await this.context.github.githubOctoGeneric.octokit.issues.createComment({
                            owner: config.lotusNodes[this.context.wallet.networkIndex].notaryOwner,
                            repo: config.lotusNodes[this.context.wallet.networkIndex].notaryRepo,
                            issue_number: request.issue_number,
                            body: commentContent,
                        })
                    }
                    if (label != '') {
                        await this.context.github.githubOctoGeneric.octokit.issues.removeAllLabels({
                            owner: config.lotusNodes[this.context.wallet.networkIndex].notaryOwner,
                            repo: config.lotusNodes[this.context.wallet.networkIndex].notaryRepo,
                            issue_number: request.issue_number,
                        })
                        await this.timeout(1000)
                        await this.context.github.githubOctoGeneric.octokit.issues.addLabels({
                            owner: config.lotusNodes[this.context.wallet.networkIndex].notaryOwner,
                            repo: config.lotusNodes[this.context.wallet.networkIndex].notaryRepo,
                            issue_number: request.issue_number,
                            labels: [label],
                        })
                    }
                } catch (e) {
                    this.context.wallet.dispatchNotification('Failed: ' + e.message)
                    console.log('faile', e.stack)
                }
            }
        }
        */
    }


    public render() {
        return (
            <div className="main">
                <div className="tabsholder">
                    <div className="tabs">
                        <div className={this.state.tabs === "1" ? "selected" : ""} onClick={() => { this.showClientRequests() }}>Public Requests ({this.context.clientRequests.length})</div>
                        <div className={this.state.tabs === "3" ? "selected" : ""} onClick={() => { this.showLargeRequests() }}>Large Requests ({this.context.largeClientRequests.length})</div>
                        <div className={this.state.tabs === "2" ? "selected" : ""} onClick={() => { this.showVerifiedClients() }}>Verified clients ({this.props.clients.length})</div>
                    </div>
                    <div className="tabssadd">
                        <ButtonPrimary onClick={() => this.requestDatacap()}>Approve Private Request</ButtonPrimary>
                        {this.state.tabs === "1" ? <>
                            <ButtonPrimary onClick={(e: any) => this.showWarnVerify(e, "Notary")}>Verify client</ButtonPrimary>
                            <ButtonPrimary onClick={() => this.verifyNewDatacap()}>Verify new datacap</ButtonPrimary>
                        </>
                            : null}
                    </div>
                </div>
                {this.state.tabs === "1" && this.context.github.githubLogged ?
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <td></td>
                                    {this.publicRequestColums.map((column: any) => <td
                                        id={column.id} onClick={this.orderPublic}>
                                        {column.value}
                                        <FontAwesomeIcon icon={["fas", "sort"]} />
                                    </td>)}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.refPublic && this.state.refPublic.checkIndex ?
                                    this.context.clientRequests.filter((element: any) => tableElementFilter(this.props.searchString, element.data) === true)
                                        .filter((_: any, i: any) => this.state.refPublic?.checkIndex(i))
                                        .map((clientReq: any, index: any) =>
                                            <tr key={index}>
                                                <td><input type="checkbox" onChange={() => this.selectClientRow(clientReq.number)} checked={this.state.selectedClientRequests.includes(clientReq.number)} /></td>
                                                <td><FontAwesomeIcon icon={["fas", "info-circle"]} id={index} onClick={(e) => this.showClientDetail(e)} /> {clientReq.data.name} </td>
                                                <td>{clientReq.data.address}</td>
                                                <td>{clientReq.data.datacap}</td>
                                                <td><a target="_blank" rel="noopener noreferrer" href={clientReq.url}>#{clientReq.number}</a></td>
                                            </tr>
                                        ) : null}
                            </tbody>
                        </table>
                        <Pagination
                            elements={this.context.clientRequests}
                            maxElements={10}
                            ref={this.onRefPublicChange}
                            refresh={() => this.setState({})}
                            search={this.props.searchString}
                        />
                        {this.context.clientRequests.length === 0 ? <div className="nodata">No client requests yet</div> : null}
                        <div className="alignright">
                            <ButtonSecondary className="buttonsecondary" onClick={async () => {
                                await this.context.github.logoutGithub()
                                await this.context.refreshGithubData()
                            }}>
                                Logout GitHub
                            </ButtonSecondary>
                        </div>
                    </div>
                    : null}
                {this.state.tabs === "3" && this.context.github.githubLogged ?
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <td></td>
                                    {this.largeRequestColums.map((column: any) => <td
                                        id={column.id} onClick={this.orderLargePublic}>
                                        {column.value}
                                        <FontAwesomeIcon icon={["fas", "sort"]} />
                                    </td>)}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.regLargePublic && this.state.regLargePublic.checkIndex ?
                                    this.context.largeClientRequests.filter((element: any) => tableElementFilter(this.props.searchString, element.data) === true)
                                        .filter((_: any, i: any) => this.state.regLargePublic?.checkIndex(i))
                                        .map((clientReq: any, index: any) =>
                                            <tr key={index}>
                                                <td><input type="checkbox" onChange={() => this.selectLargeClientRow(clientReq.number)} checked={this.state.selectedLargeClientRequests.includes(clientReq.number)} /></td>
                                                <td><FontAwesomeIcon icon={["fas", "info-circle"]} id={index} onClick={(e) => this.showClientDetail(e)} /> {clientReq.data.name} </td>
                                                <td>{clientReq.address}</td>
                                                <td>{clientReq.datacap}</td>
                                                <td><a target="_blank" rel="noopener noreferrer" href={clientReq.url}>#{clientReq.number}</a></td>
                                            </tr>
                                        ) : null}
                            </tbody>
                        </table>
                        <Pagination
                            elements={this.context.largeClientRequests}
                            maxElements={10}
                            ref={this.onRefLargePublicChange}
                            refresh={() => this.setState({})}
                            search={this.props.searchString}
                        />
                        {this.context.largeClientRequests.length === 0 ? <div className="nodata">No large client requests yet</div> : null}
                        <div className="alignright">
                            <ButtonSecondary className="buttonsecondary" onClick={async () => {
                                await this.context.github.logoutGithub()
                                await this.context.refreshGithubData()
                            }}>
                                Logout GitHub
                            </ButtonSecondary>
                        </div>
                    </div>
                    : null}
                {this.state.tabs === "1" && !this.context.github.githubLogged ?
                    <div id="githublogin">
                        <LoginGithub
                            redirectUri={config.oauthUri}
                            clientId={config.githubApp}
                            scope="repo"
                            onSuccess={async (response: any) => {
                                await this.context.github.loginGithub(response.code)
                                await this.context.refreshGithubData()
                            }}
                            onFailure={(response: any) => {
                                console.log('failure', response)
                            }}
                        />
                    </div>
                    : null}
                {this.state.tabs === "2" ?
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    {this.verifiedClientsColums.map((column: any) => <td
                                        id={column.id} onClick={this.orderVerified}>
                                        {column.value}
                                        <FontAwesomeIcon icon={["fas", "sort"]} />
                                    </td>)}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.refVerified && this.state.refVerified.checkIndex ?
                                    this.props.clients.filter((element) => tableElementFilter(this.props.searchString, element) === true)
                                        .filter((_, i: any) => this.state.refVerified?.checkIndex(i))
                                        .map((transaction: any, index: any) =>
                                            <tr key={index}>
                                                <td>{transaction.verified}</td>
                                                <td>{transaction.key}</td>
                                                <td>{bytesToiB(transaction.datacap)}</td>
                                            </tr>
                                        ) : null}
                            </tbody>
                        </table>
                        {this.props.clients.length === 0 ? <div className="nodata">No verified clients yet</div> : null}
                        <Pagination
                            elements={this.props.clients}
                            maxElements={10}
                            ref={this.onRefVerifiedChange}
                            refresh={() => this.setState({})}
                            search={this.props.searchString}
                        />
                    </div>
                    : null}
            </div>
        )
    }
}