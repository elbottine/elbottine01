import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {canEdit, encrypt, hash} from './security';

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
            userId: context.bindingData?.userId.toLowerCase(),
            password: context.bindingData?.password,
        };

        var userInfo = {
            name: data.userId,
            reader: true,
            editor: canEdit(data.userId),
            token: ''
        };

        if (validateAccount(data.userId, data.password)) {
            userInfo.token = encrypt(userInfo);
        }
        else {
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

function validateAccount(userId: string, password: string) {
    var h = hash(password);
    if (userId === 'said'   && h === '98a904cc8e43e1226e9a3388772f99c31c1fdd6f') return true;
    if (userId === 'ingrid' && h === '4bade81175f7af909e0eeac262905eb44961444d') return true;
    //if (userId === 'myriam' && h === '5891bb551084b46bd17e5c1cca496c43a99be933') return true;
    return false;
}

export default httpTrigger;
