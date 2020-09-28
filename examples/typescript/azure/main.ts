import { App } from 'cdktf';
import { ContosoContainerStack } from "./ContosoContainerStack"

const app = new App();

//Create container stack from Contoso wide shared library
new ContosoContainerStack(app, 'my-contoso-container-stack');

app.synth();