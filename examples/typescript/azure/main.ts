import { App } from 'cdktf';
import { ContosoContainerStack } from "./ContosoContainerStack"
//import { ContosoCosmosSqlFreeTierStack } from "./ContosoCosmosSqlFreeTierStack"

const app = new App();

//Create container stack from Contoso wide shared library
new ContosoContainerStack(app, 'my-contoso-container-stack');

//Create free tier cosmos db stack from Contoso wide shared library
//new ContosoCosmosSqlFreeTierStack(app, 'my-cosmos-sql-free-tier-stack');

app.synth();