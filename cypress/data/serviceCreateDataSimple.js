import { faker } from "@faker-js/faker";

export const getSimpleCreateScenarios = () => [
  {
    description: "[Scenario 1] Using only required fields (Default values)",
    payload: {
      fullUrl: faker.internet.url({ protocol: "https" }),
    },
  },
  {
    description:
      "[Scenario 2] Modifying all default values & Filling all optional fields",
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
        name: `auto.Test-${faker.string.alphanumeric(16)}_~`,
        tags: `${faker.string.alphanumeric(8)}, ${faker.string.alphanumeric(8)}`,
      },
    },
  },
  {
    description: "[Scenario 3] Filling all optional fields",
    payload: {
      fullUrl: faker.internet.url({ protocol: "http" }),
      advancedFields: {
        // clientCert: faker.string.uuid(),
        // caCert: faker.string.uuid(),
        tlsVerify: false,
      },
      generalFields: {
        tags: `${faker.string.alphanumeric(8)}, ${faker.string.alphanumeric(8)}`,
      },
    },
  },
];
