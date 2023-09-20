const fs=require("fs").promises;
const path=require("path")
const {google}=require("googleapis")
const {authenticate}=require("@google-cloud/local-auth")
const process=require("process")


const CREDENTIALS_FILE_CONTENT={
    web: {
        client_id: `${process.env.GOOGLE_CLIENT_ID}`,
        project_id: `${process.env.GOOGLE_PROJECT_ID}`,
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_secret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        redirect_uris: ["http://localhost:3000/google/callback"],
        javascript_origins: ["http://localhost:3000"],
      },
}

const TOKEN_PATH=path.join();
const CREDENTIALS_PATH=path.join();

const SCOPES=[
    "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.apps.readonly",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.metadata",
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/drive.photos.readonly",
  "https://www.googleapis.com/auth/drive.readonly",
]

async function loadSavedCredentialsIfExist(){
    try{
       const content=await fs.readFile(TOKEN_PATH);
       const credentials=JSON.parse(content);
       
       return google.auth,fromJSON(credentials);
    }catch(err){
        return null || console.log(err.message)
    }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */

async function savedCredentials(client){
    const content=await fs.readFile(CREDENTIALS_PATH)
    const keys=JSON.parse(content);
    const key=keys.installed || keys.web;
    const payload=JSON.stringify({
        type:"authorized_user",
        client_id:key.client_id,
        client_secret:key.client_secret,
        refresh_token:client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH,payload);
}


async function checkFileExits(filePath){
    try{
        await fs.access(filePath);
        return true;
    }catch(client){
        return client || console.log(client);
    }

}

async function authorize(){
    let client=await loadSavedCredentialsIfExist();
    if(client){
        return client;
    }

    const fileExists= await checkFileExits(CREDENTIALS_PATH);
    if(!fileExists){
        await fs.writeFile(CREDENTIALS_PATH,json.stringify(CREDENTIALS_FILE_CONTENT))
    }

    client=await authenticate({
        scopes:SCOPES,
        keyfilePath:CREDENTIALS_PATH,
    })
    if(client.credentials){
        await savedCredentials(client)
    }
    return client;
}

authorize().then((auth)=>console.log(auth));