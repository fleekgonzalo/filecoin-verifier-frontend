export interface Verifier {
        id: number;
        name: string;
        use_case: string[];
        location: string;
        website: string;
        email: string;
        fil_slack_id: string;
        github_user: string[];
        ldn_config: {
            active_signer: string;
            signing_address: string;
        }
        docs_url? : string;
        info? : string;
}

export const data : Verifier[] = [
    {
        "id": 2,
        "name": "Filecoin Foundation",
        "use_case": [
            "General"
        ],
        "location": "Europe",
        "website": "https://fil.org/",
        "email": "notaryb@a.com",
        "fil_slack_id": "@Danny O'Brien",
        "github_user": [
            "dannyob"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f1k6wwevxvp466ybil7y2scqlhtnrz5atjkkyvm4a"
        }
    },
    {
        "id": 3,
        "name": "Fenbushi Capital",
        "use_case": [
            "General"
        ],
        "location": "Greater China Region",
        "website": "https://fenbushi.vc",
        "email": "notaryb@a.com",
        "fil_slack_id": "@Zhehao Chen",
        "github_user": [
            "Fenbushi-Filecoin"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f1yqydpmqb5en262jpottko2kd65msajax7fi4rmq"
        },
        "docs_url": "https://github.com/filecoin-project/filecoin-plus-client-onboarding/tree/main/Fenbushi%20Capital",
        "info": "Before submitting your request, please make sure to check out the guidelines and criteria to accept Datacap request for [Fenbushi Capital](https://github.com/filecoin-project/filecoin-plus-client-onboarding/tree/main/Fenbushi%20Capital)"
    },
    {
        "id": 5,
        "name": "Textile",
        "use_case": [
            "Web3",
            "Web2 integrations",
            "Data Warehousing"
        ],
        "location": "North America",
        "website": "textile.io",
        "email": "notaryb@a.com",
        "fil_slack_id": "@andrewxhill (textile.io)",
        "github_user": [
            "andrewxhill"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f1n4kuihubfesg55brkx5ntwqyglvbhydxjfodwra"
        }
    },
    {
        "id": 6,
        "name": "Blotocol Japan",
        "use_case": [
            "Media and Entertainment"
        ],
        "location": "Asia minus GCR",
        "website": "https://blotocol.com/",
        "email": "notaryb@a.com",
        "fil_slack_id": "@masaaki nawatani",
        "github_user": [
            "MasaakiNawatani"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f1fh53sdaie3yi25qxwcqxpt5h4naex5ibdaffibi"
        }
    },
    {
        "id": 7,
        "name": "XnMatrix",
        "use_case": [
            "User Content",
            "Scientific Datasets",
            "Media and Entertainment"
        ],
        "location": "North America",
        "website": "@XnMatrixSV on Filecoin Slack",
        "email": "notaryb@a.com",
        "fil_slack_id": "@XnMatrix SV",
        "github_user": [
            "XnMatrixSV"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f1yuz2twsllparyfqwslfiuxrc5wj4mfiflvnsw6a"
        }
    },
    {
        "id": 8,
        "name": "MathWallet",
        "use_case": [
            "General",
            "Blockchain Data",
            "Web3 DApp"
        ],
        "location": "Asia minus GCR",
        "website": "mathwallet.org",
        "email": "notaryb@a.com",
        "fil_slack_id": "@stone",
        "github_user": [
            "rayshitou"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f136bz32l2hlyad4npmfg5dngcdw3jk3tpcpoz2ja"
        }
    },
    {
        "id": 9,
        "name": "IPFS Force",
        "use_case": [
            "User Content",
            "Scientific Data",
            "Media & Entertainment"
        ],
        "location": "Greater China Region",
        "website": "@Steven on Filecoin Slack, @Steven004_Li on Twitter",
        "email": "notaryb@a.com",
        "fil_slack_id": "@Steven",
        "github_user": [
            "steven004"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f1qoxqy3npwcvoqy7gpstm65lejcy7pkd3hqqekna"
        }
    },
    {
        "id": 10,
        "name": "IPFSMain",
        "use_case": [
            "Personal user storage",
            "Scientific Datasets",
            "Video & Music"
        ],
        "location": "Greater China Region",
        "website": "@neogeweb3 on Filecoin Slack",
        "email": "notaryb@a.com",
        "fil_slack_id": "@neogeweb3",
        "github_user": [
            "neogeweb3"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f13k5zr6ovc2gjmg3lvd43ladbydhovpylcvbflpa"
        }
    },
    {
        "id": 11,
        "name": "Julien NOEL",
        "use_case": [
            "General"
        ],
        "location": "Europe",
        "website": "@Julien NOEL - Twin Quasar (s0nik42) on Filecoin Slack",
        "email": "notaryb@a.com",
        "fil_slack_id": "@Julien NOEL - Twin Quasar (s0nik42)",
        "github_user": [
            "s0nik42"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f1wxhnytjmklj2czezaqcfl7eb4nkgmaxysnegwii"
        }
    },
    {
        "id": 12,
        "name": "1475-simon",
        "use_case": [
            "General"
        ],
        "location": "Greater China Region",
        "website": "1475ipfs.com, @simon686-1475 on Filecoin Slack",
        "email": "notaryb@a.com",
        "fil_slack_id": "@simon686-1475",
        "github_user": [
            "ozhtdong"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f1lwpw2bcv66pla3lpkcuzquw37pbx7ur4m6zvq2a"
        }
    },
    {
        "id": 13,
        "name": "Performive",
        "use_case": [
            "General"
        ],
        "location": "North America",
        "website": "@Performive on Filecoin Slack",
        "email": "notaryb@a.com",
        "fil_slack_id": "@Tim Williams",
        "github_user": [
            "TimWilliams00"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f13vzzb65gr7pjmb2vsfq666epq6lhdbanc4vfopq"
        }
    },
    {
        "id": 14,
        "name": "12ships Foundation",
        "use_case": [
            "Public datasets",
            "User data",
            "dApps"
        ],
        "location": "Asia minus GCR",
        "website": "@IreneYoung-12Ships on Filecoin Slack",
        "email": "notaryb@a.com",
        "fil_slack_id": "IreneYoung-12Ships",
        "github_user": [
            "IreneYoung"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f1inc6lx4oosssdf5n7rkt45rtwzlip7ohott7vha"
        }
    },
    {
        "id": 15,
        "name": "Nicklas Reiersen / TechHedge",
        "use_case": [
            "General"
        ],
        "location": "Europe",
        "website": "@Reiers on Filecoin Slack",
        "email": "notaryb@a.com",
        "fil_slack_id": "@Reiers",
        "github_user": [
            "Reiers"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f1oz43ckvmtxmmsfzqm6bpnemqlavz4ifyl524chq"
        }
    },
    {
        "id": 16,
        "name": "Speedium",
        "use_case": [
            "General"
        ],
        "location": "Europe",
        "website": "@Wijnand Schouten on Filecoin Slack",
        "email": "notaryb@a.com",
        "fil_slack_id": "@Wijnand Schouten",
        "github_user": [
            "cryptowhizzard"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f1krmypm4uoxxf3g7okrwtrahlmpcph3y7rbqqgfa"
        }
    },
    {
        "id": 17,
        "name": "IPFSUnion - Steve Song",
        "use_case": [
            "General"
        ],
        "location": "Greater China Region",
        "website": "@IPFSUnion.cn on Filecoin Slack",
        "email": "notaryb@a.com",
        "fil_slack_id": "@IPFSUnion.cn",
        "github_user": [
            "IPFSUnion"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f1enfilmuyphmnqexjt33zfbk56c25mo2lplgbpxa"
        }
    },
    {
        "id": 18,
        "name": "ByteBase",
        "use_case": [
            "General"
        ],
        "location": "Greater China Region",
        "website": "@ByteBase Official on Filecoin Slack",
        "email": "notaryb@a.com",
        "fil_slack_id": "@ByteBase Official",
        "github_user": [
            "swatchliu"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f1yh6q3nmsg7i2sys7f7dexcuajgoweudcqj2chfi"
        }
    },
    {
        "id": 19,
        "name": "Wusi R&D Center",
        "use_case": [
            "General"
        ],
        "location": "Greater China Region",
        "website": "@wjywood on Filecoin Slack",
        "email": "notaryb@a.com",
        "fil_slack_id": "@wjywood",
        "github_user": [
            "wjywood"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f1lxlgiariqqfd7fqn7pvjt3azvwzly3eyyztrqmi"
        }
    },
    {
        "id": 20,
        "name": "Binghe Distributed Storage Lab",
        "use_case": [
            "General"
        ],
        "location": "Greater China Region",
        "website": "@Binghe Lab(冰河分布式存储实验室) on Filecoin Slack",
        "email": "notaryb@a.com",
        "fil_slack_id": "@Binghe Lab",
        "github_user": [
            "MRJAVAZHAO"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f14gme3f52prtyzk6pblogrdd6b6ivp4swc6qmesi"
        }
    },
    {
        "id": 21,
        "name": "Koda Inc.",
        "use_case": [
            "General"
        ],
        "location": "North America",
        "website": "@Emma-Koda CEO on Filecoin Slack",
        "email": "notaryb@a.com",
        "fil_slack_id": "@Emma-Koda CEO",
        "github_user": [
            "KodaRobotDog"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f1jyalts5uhtmp5sbbssse23toshvsqbbtjgukm5a"
        }
    },
    {
        "id": 22,
        "name": "Filswan NBFS",
        "use_case": [
            "General"
        ],
        "location": "North America",
        "website": "@Charles Cao - FilSwan on Filecoin Slack",
        "email": "notaryb@a.com",
        "fil_slack_id": "@Charles Cao - FilSwan",
        "github_user": [
            "flyworker"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f1hlubjsdkv4wmsdadihloxgwrz3j3ernf6i3cbpy"
        }
    },
    {
        "id": 24,
        "name": "SECUREXPERTS Inc.",
        "use_case": [
            "General"
        ],
        "location": "North America",
        "website": "@Darnell Washington on Filecoin Slack",
        "email": "notaryb@a.com",
        "fil_slack_id": "@Darnell Washington",
        "github_user": [
            "DarnellWashington"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f1bjdcjxha3ldcstw5zmvkyu3r2p5x2bsm745kgsi"
        }
    },
    {
        "id": 23,
        "name": "Holon Innovations",
        "use_case": [
            "General"
        ],
        "location": "North America",
        "website": "@Meg Dennis on Filecoin Slack",
        "email": "notaryb@a.com",
        "fil_slack_id": "@Meg Dennis",
        "github_user": [
            "MegTei"
        ],
        "ldn_config": {
            "active_signer": "true",
            "signing_address": "f1ystxl2ootvpirpa7ebgwl7vlhwkbx2r4zjxwe5i"
        }
    }
]

