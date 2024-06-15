import { GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient } from "../utils/Cognito";
import Cookies from "js-cookie"

export const userProfile = async() => {
    try {
        const accessToken = Cookies.get("token");
        const input = { 
          AccessToken: accessToken, 
        };
        const command = new GetUserCommand(input);
        const response = await cognitoClient.send(command);
        return response
    } catch (err) {
        throw(err)
    }
}