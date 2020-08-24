import { App } from 'cdktf';
import { ContosoContainerStack } from "./ContosoContainerStack"

const app = new App();
new ContosoContainerStack(app, 'my-contoso-container-stack');
app.synth();
