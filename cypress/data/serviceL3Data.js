// cypress/data/serviceL3Data.js

import { faker } from "@faker-js/faker";

export const getSingleFieldsScenarios = () => ({
  fullUrl: {
    mode: "simple",
    scenarios: [
      { input: "api.kong-air.com" }, // without full url
      { input: "ftp://api.kong-air.com" }, // invalid full url: wrong protocol
      { input: "http://" }, // invalid full url: only protocol, no host
    ],
    expectedError:
      "The URL must follow a valid format. Example: https://api.kong-air.com/flights",
  },
  retries: {
    mode: "simple",
    scenarios: [{ input: "-1" }, { input: "32768" }],
    expectedError:
      "schema violation (retries: value should be between 0 and 32767)",
  },
  connTimeout: {
    mode: "simple",
    scenarios: [{ input: "0" }, { input: "2147483647" }],
    expectedError:
      "schema violation (connect_timeout: value should be between 1 and 2147483646)",
  },
  writeTimeout: {
    mode: "simple",
    scenarios: [{ input: "0" }, { input: "2147483647" }],
    expectedError:
      "schema violation (write_timeout: value should be between 1 and 2147483646)",
  },
  readTimeout: {
    mode: "simple",
    scenarios: [{ input: "0" }, { input: "2147483647" }],
    expectedError:
      "schema violation (read_timeout: value should be between 1 and 2147483646)",
  },
  clientCert: {
    mode: "simple",
    scenarios: [{ input: faker.string.alphanumeric(32) }],
    expectedError:
      "schema violation (client_certificate.id: expected a valid UUID)",
  },
  caCert: {
    mode: "simple",
    scenarios: [{ input: faker.string.alphanumeric(32) }],
    expectedError:
      "schema violation (ca_certificates.1: expected a valid UUID)",
  },
  name: {
    mode: "simple",
    scenarios: [{ input: "my service" }, { input: "name@" }],
    expectedError:
      "The name can be any string containing characters, letters, numbers, or the following characters: ., -, _, or ~. Do not use spaces.",
  },
  tags: {
    mode: "simple",
    scenarios: [
      {
        input: "<script>alert('xss')</script>",
        expectedError:
          "expected printable ascii (except `,` and `/`) or valid utf-8 sequences)",
      },
      // { input: faker.string.alphanumeric(3000), expectedError: "System error" }, // too long tags , raising exception
      // tag number limit
    ],
  },
  host: {
    mode: "manual",
    scenarios: [
      { input: "api_kong!air.com", expectedError: "Invalid host" }, // invalid character
      { input: "   ", expectedError: "Host cannot be empty" }, // empty
    ],
  },
  path: {
    mode: "manual",
    scenarios: [
      { input: "sample", expectedError: "Path must begin with /" },
      {
        input: "/api/my service",
        expectedError:
          "Path should not include characters outside of the reserved list of RFC 3986",
      },
      {
        input: "/api/测试",
        expectedError:
          "Path should not include characters outside of the reserved list of RFC 3986",
      },
      {
        input: "/<",
        expectedError:
          "Path should not include characters outside of the reserved list of RFC 3986",
      },
      {
        input: "/api\t/test",
        expectedError:
          "Path should not include characters outside of the reserved list of RFC 3986",
      },
    ],
  },
  port: {
    mode: "manual",
    scenarios: [{ input: -1 }, { input: 65536 }],
    expectedError: "Port must be between 0 and 65535",
  },
});

export const getMultiFieldsScenarios = () => [
  {
    description:
      "should not allow filling client certificate and CA certificates when protocol is HTTP",
    payload: {
      fullUrl: faker.internet.url({ protocol: "http" }),
      advancedFields: {
        clientCert: faker.string.uuid(),
        caCert: faker.string.uuid(),
      },
    },
    expectedError:
      "4 schema violations (failed conditional validation given value of field 'protocol'; failed conditional validation given value of field 'protocol'; ca_certificates: value must be null; client_certificate: value must be null)",
  },
  {
    description:
      "should not allow filling an nonexistent client certificate when protocol is HTTPs",
    payload: {
      fullUrl: faker.internet.url({ protocol: "https" }),
      advancedFields: {
        clientCert: faker.string.uuid(),
      },
    },
    expectedError: "does not reference an existing 'certificates' entity.",
  },
];

