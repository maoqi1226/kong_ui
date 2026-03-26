import { faker } from "@faker-js/faker";

// existing fields: None
const PROTOCOL_TYPE0 = ["grpc", "grpcs", "tcp", "udp", "tls_passthrough"];
// existing fields: path
const PROTOCOL_TYPE1 = ['ws', 'http']
// existing fields: path、clientCert、tlsVerify
const PROTOCOL_TYPE2 = ['wss']
// existing fields: clientCert、caCert、tlsVerify
const PROTOCOL_TYPE3 = ["tls"];
// existing fields: path、clientCert、caCert、tlsVerify
const PROTOCOL_TYPE4 = ['https']

export const getManualCreateScenarios = () => [
  {
    description: "[Scenario 1] Using only required fields (Default values)",
    payload: {
      protocolFields: {
        protocol: "http",
        host: faker.internet.domainName(),
      },
    },
  },
  {
    description: `[Scenario 2] Filling all missing required fields (protocol random in ${PROTOCOL_TYPE0})`,
    payload: {
      protocolFields: {
        protocol: `${PROTOCOL_TYPE0[Math.floor(Math.random() * PROTOCOL_TYPE0.length)]}`,
        host: faker.internet.domainName(),
        // port: 8080,
      },
      // advancedFields: {
      //   retries: 1,
      //   connTimeout: 1,
      //   writeTimeout: 1,
      //   readTimeout: 1,
      // },
      // generalFields: {
      //   name: `autoTest-${faker.string.alphanumeric(16)}`,
      //   tags: `${faker.string.alphanumeric(8)}, ${faker.string.alphanumeric(8)}`,
      // },
    },
  },
  {
    description: `[Scenario 3] Filling all missing required fields (protocol random in ${PROTOCOL_TYPE1})`,
    payload: {
      protocolFields: {
        protocol: `${PROTOCOL_TYPE1[Math.floor(Math.random() * PROTOCOL_TYPE1.length)]}`,
        host: faker.internet.domainName(),
        path: `/${faker.string.alphanumeric(15)}`,
        // port: 8080,
      },
      // advancedFields: {
      //   retries: 1,
      //   connTimeout: 1,
      //   writeTimeout: 1,
      //   readTimeout: 1,
      // },
      // generalFields: {
      //   name: `autoTest-${faker.string.alphanumeric(16)}`,
      //   tags: `${faker.string.alphanumeric(8)}`,
      // },
    },
  },
  {
    description: `[Scenario 4] Filling all missing required fields & path & tlsVerify (${PROTOCOL_TYPE2})`,
    payload: {
      protocolFields: {
        protocol: `${PROTOCOL_TYPE2[Math.floor(Math.random() * PROTOCOL_TYPE2.length)]}`,
        host: faker.internet.domainName(),
        path: `/${faker.string.alphanumeric(15)}`,
        // port: 8080,
      },
      advancedFields: {
        // retries: 1,
        // connTimeout: 1,
        // writeTimeout: 1,
        // readTimeout: 1,
        // clientCert: faker.string.uuid(),
        tlsVerify: false,
      },
      // generalFields: {
      //   name: `autoTest-${faker.string.alphanumeric(16)}`,
      //   tags: `${faker.string.alphanumeric(8)}, ${faker.string.alphanumeric(8)}`,
      // },
    },
  },
  {
    description: `[Scenario 5] Modify all required fields & filling all optional fields(${PROTOCOL_TYPE3})`,
    payload: {
      protocolFields: {
        protocol: `${PROTOCOL_TYPE3[Math.floor(Math.random() * PROTOCOL_TYPE3.length)]}`,
        host: faker.internet.domainName(),
        port: faker.number.int({ min: 0, max: 65535 }),
      },
      advancedFields: {
        retries: 1,
        connTimeout: 1,
        writeTimeout: 1,
        readTimeout: 1,
        // clientCert: faker.string.uuid(),
        caCert: faker.string.uuid(),
        tlsVerify: true,
      },
      generalFields: {
        name: `autoTest-${faker.string.alphanumeric(16)}`,
        tags: `${faker.string.alphanumeric(8)}, ${faker.string.alphanumeric(8)}`,
      },
    },
  },
  {
    description: `[Scenario 6] Modify all required fields & filling all optional fields(${PROTOCOL_TYPE4})`,
    payload: {
      protocolFields: {
        protocol: `${PROTOCOL_TYPE4[Math.floor(Math.random() * PROTOCOL_TYPE4.length)]}`,
        host: faker.internet.domainName(),
        path: `/${faker.string.alphanumeric(15)}`,
        port: faker.number.int({ min: 0, max: 65535 }),
      },
      advancedFields: {
        retries: 32767,
        connTimeout: 2147483646,
        writeTimeout: 2147483646,
        readTimeout: 2147483646,
        // clientCert: faker.string.uuid(),
        caCert: `${faker.string.uuid()},${faker.string.uuid()}`,
        tlsVerify: true,
      },
      generalFields: {
        name: `autoTest-${faker.string.alphanumeric(16)}`,
        tags: `${faker.string.alphanumeric(8)}, ${faker.string.alphanumeric(8)}`,
      },
    },
  },
];
