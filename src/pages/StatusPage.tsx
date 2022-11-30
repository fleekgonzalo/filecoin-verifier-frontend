import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import {
    Box,
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Data } from "../context/Data/Index";

// The main goal of this function is just to wait for 5 seconds before
// executing the next line of code after it
const testAsync = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 5000);
    });
};

const LDNBotHealthCheck = async (gh: any): Promise<boolean> => {
    try {
        if (!gh || Object.keys(gh).length < 1) {
            console.log("NO GH INSTANCE AVAILABLE!!");
            return false;
        }
        let result = false;
        const initialBody = "Test Body";
        await gh?.githubOcto?.rest?.issues?.get({
            owner: "keyko-io",
            repo: "filecoin-large-clients-onboarding",
            issue_number: 1407,
        });
        await gh?.githubOcto?.rest?.issues?.update({
            owner: "keyko-io",
            repo: "filecoin-large-clients-onboarding",
            issue_number: 1407,
            body: initialBody,
        });
        await testAsync();
        const issueAfterChange =
            await gh?.githubOcto?.rest?.issues.get({
                owner: "keyko-io",
                repo: "filecoin-large-clients-onboarding",
                issue_number: 1407,
            });
        if (issueAfterChange?.body !== initialBody) {
            result = true;
        }
        return result;
    } catch (err) {
        console.log(err);
        return false;
    }
};

const StatusPage = () => {
    const context: any = useContext(Data);
    const { github } = context;
    const [isLDNBotHealthy, setIsLDNBotHealthy] =
        useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const handler = async () => {
            setIsLoading(true);
            let res = await LDNBotHealthCheck(github);
            setIsLDNBotHealthy(Boolean(res));
            setIsLoading(false);
        };
        handler();
    }, [github]);

    return (
        <Box m="8rem auto">
            <Typography variant="h4" mb="2rem" textAlign="center">
                Service Status
            </Typography>
            <Box sx={{ width: "60rem" }}>
                <Paper elevation={4}>
                    <Stack
                        sx={{ p: "1rem" }}
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Typography variant="h6">
                            Current status by service
                        </Typography>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={4}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                            >
                                <CheckCircleIcon
                                    sx={{ color: "green" }}
                                />
                                <span>Active</span>
                            </Stack>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                            >
                                <DoNotDisturbOnIcon
                                    sx={{ color: "red" }}
                                />
                                <span>Down</span>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack>
                        <Stack
                            sx={{ p: "1rem" }}
                            direction="row"
                            justifyContent="space-between"
                        >
                            <Typography variant="body1">
                                SSA BOT
                            </Typography>
                            <CheckCircleIcon
                                sx={{ color: "green" }}
                            />
                        </Stack>
                        <Divider />
                        <Stack
                            sx={{ p: "1rem" }}
                            direction="row"
                            justifyContent="space-between"
                        >
                            <Typography variant="body1">
                                LDN BOT
                            </Typography>
                            {isLDNBotHealthy ? (
                                <CheckCircleIcon
                                    sx={{ color: "green" }}
                                />
                            ) : isLoading ? (
                                "Checking.."
                            ) : (
                                <DoNotDisturbOnIcon
                                    sx={{ color: "red" }}
                                />
                            )}
                        </Stack>
                    </Stack>
                </Paper>
            </Box>
        </Box>
    );
};

export default StatusPage;
