import { faker } from "@faker-js/faker";

// 无 path、clientCert、caCert、tlsVerify 时的场景
const PROTOCOL_TYPE0 = ["grpc", "grpcs", "tcp", "udp", "tls_passthrough"];
// 有 path 时的场景
const PROTOCOL_TYPE1 = ['ws', 'http']
// 有 path、clientCert、tlsVerify 时的场景
const PROTOCOL_TYPE2 = ['wss']
// 有 clientCert、caCert、tlsVerify 时的场景
const PROTOCOL_TYPE3 = ["tls"];
// 有 path、clientCert、caCert、tlsVerify 时的场景
const PROTOCOL_TYPE4 = ['https']

export const getManualFieldsScenarios = () => [
  {
    description: "[grpc] 无path、clientCert、caCert、tlsVerify",
    payload: {
      protocol: "grpc",
      expect: { path: false, clientCert: false, caCert: false, tlsVerify: false },
    },
  },
  {
    description: "[grpcs] 无path、clientCert、caCert、tlsVerify",
    payload: {
      protocol: "grpcs",
      expect: { path: false, clientCert: false, caCert: false, tlsVerify: false },
    },
  },
  {
    description: "[tcp] 无path、clientCert、caCert、tlsVerify",
    payload: {
      protocol: "tcp",
      expect: { path: false, clientCert: false, caCert: false, tlsVerify: false },
    },
  },
  {
    description: "[udp] 无path、clientCert、caCert、tlsVerify",
    payload: {
      protocol: "udp",
      expect: { path: false, clientCert: false, caCert: false, tlsVerify: false },
    },
  },
  {
    description: "[tls_passthrough] 无path、clientCert、caCert、tlsVerify",
    payload: {
      protocol: "tls_passthrough",
      expect: { path: false, clientCert: false, caCert: false, tlsVerify: false },
    },
  },
  {
    description: "[ws] 有path，无clientCert、caCert、tlsVerify",
    payload: {
      protocol: "ws",
      expect: { path: true, clientCert: false, caCert: false, tlsVerify: false },
    },
  },
  {
    description: "[http] 有path，无clientCert、caCert、tlsVerify",
    payload: {
      protocol: "http",
      expect: { path: true, clientCert: false, caCert: false, tlsVerify: false },
    },
  },
  {
    description: "[wss] 有path，clientCert、tlsVerify，无caCert",
    payload: {
      protocol: "wss",
      expect: { path: true, clientCert: true, caCert: false, tlsVerify: true },
    },
  },
  {
    description: "[tls] 有clientCert、caCert、tlsVerify，无path",
    payload: {
      protocol: "tls",
      expect: { path: false, clientCert: true, caCert: true, tlsVerify: true },
    },
  },
  {
    description: "[https] 有path，clientCert、tlsVerify、caCert",
    payload: {
      protocol: "https",
      expect: { path: true, clientCert: true, caCert: true, tlsVerify: true },
    },
  },
];

export const getSwitchModeCreateScenarios = () => [
  {
    manual: {
      description: `[Scenario 6] Modify all required fields & filling all optional fields(${PROTOCOL_TYPE4})`,
      payload: {
        protocolFields: {
          protocol: `${PROTOCOL_TYPE4[Math.floor(Math.random() * PROTOCOL_TYPE4.length)]}`,
          host: faker.internet.domainName(),
          path: `/${faker.string.alphanumeric(15)}`,
          port: faker.number.int({ min: 0, max: 65535 }),
        },
        advancedFields: {
          retries: 3000,
          connTimeout: 3000,
          writeTimeout: 3000,
          readTimeout: 3000,
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
    simple: {
      payload: {
        fullUrl: faker.internet.url({ protocol: "https" }),
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
  },
];