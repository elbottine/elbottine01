import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {canEdit, encrypt} from './security';

// email https://stackoverflow.com/questions/19509357/not-able-to-connect-to-outlook-com-smtp-using-nodemailer
// http://localhost:7071/api/account/login?userId=aaa&password=bbb
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        context.log(`################################################################`);
        context.log(`account req: ${JSON.stringify(req, null, 4)}`);
        context.log(`account context: ${JSON.stringify(context, null, 4)}`);
        context.log(`account req.query: ${JSON.stringify(req.query, null, 4)}`);
        context.log(`account userId: ${context.bindingData.userId}`);
        context.log(`account password: ${context.bindingData.password}`);
        context.log(`################################################################`);

        let data = {
            userId: context.bindingData.userId,
            password: context.bindingData.password,
        };

        var userInfo = {
            name: data.userId,
            reader: true,
            editor: canEdit(data.userId),
            token: ''
        };

        switch (req.method) {
            case "GET":                
            case "POST":
                userInfo.token = encrypt(userInfo);
                break;
            default:
                throw Error(`${req.method} not allowed`);
        }

        context.res = {
            body: userInfo
        }; 

    } catch (err) {
        context.log(`*** Error ${err}`);
        context.log(`*** Error ${JSON.stringify(err)}`);
        context.res = {
            status: 501,
            body: err,
        };
    }
};

export default httpTrigger;
