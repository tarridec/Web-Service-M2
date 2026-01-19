import 'dotenv/config';
import express from 'express';
import * as soap from 'soap';
import { productsService } from './soap/services/products-service.soap';
import fs from 'fs';
import path from 'path';
import { authService } from './soap/services/auth-service.soap';

const server = express();
const port: number = Number(process.env.SOAP_PORT) ?? 4000;
const productsServiceWSDL: string = fs.readFileSync(path.resolve('src/soap/wsdl/ProductsService.wsdl'), 'utf8');
const authServiceWSDL: string = fs.readFileSync(path.resolve('src/soap/wsdl/AuthService.wsdl'), 'utf8');

server.listen(port, () => {
    soap.listen(server, '/soap/products', productsService, productsServiceWSDL);
    soap.listen(server, '/soap/auth', authService, authServiceWSDL);
    console.log(`Serveur SOAP is running on http://localhost:${port}`);
});

export default server;