// @ts-noCheck
import * as Types from "./";

import {
  Client,
  InvokeApiResult
} from "@web3api/core-js";

export type UInt = number;
export type UInt8 = number;
export type UInt16 = number;
export type UInt32 = number;
export type Int = number;
export type Int8 = number;
export type Int16 = number;
export type Int32 = number;
export type Bytes = Uint8Array;
export type BigInt = string;
export type Json = string;
export type String = string;
export type Boolean = boolean;

/// Imported Objects START ///

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_TxReceipt {
  to: String;
  from: String;
  contractAddress: String;
  transactionIndex: UInt32;
  root?: String | null;
  gasUsed: BigInt;
  logsBloom: String;
  transactionHash: String;
  logs: Array<Types.Ethereum_Log>;
  blockNumber: BigInt;
  blockHash: String;
  confirmations: UInt32;
  cumulativeGasUsed: BigInt;
  effectiveGasPrice: BigInt;
  byzantium: Boolean;
  type: UInt32;
  status?: UInt32 | null;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_Log {
  blockNumber: BigInt;
  blockHash: String;
  transactionIndex: UInt32;
  removed: Boolean;
  address: String;
  data: String;
  topics: Array<String>;
  transactionHash: String;
  logIndex: UInt32;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_TxResponse {
  hash: String;
  to?: String | null;
  from: String;
  nonce: UInt32;
  gasLimit: BigInt;
  gasPrice?: BigInt | null;
  data: String;
  value: BigInt;
  chainId: BigInt;
  blockNumber?: BigInt | null;
  blockHash?: String | null;
  timestamp?: UInt32 | null;
  confirmations: UInt32;
  raw?: String | null;
  r?: String | null;
  s?: String | null;
  v?: UInt32 | null;
  type?: UInt32 | null;
  accessList?: Array<Types.Ethereum_Access> | null;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_Access {
  address: String;
  storageKeys: Array<String>;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_TxRequest {
  to?: String | null;
  from?: String | null;
  nonce?: UInt32 | null;
  gasLimit?: BigInt | null;
  gasPrice?: BigInt | null;
  data?: String | null;
  value?: BigInt | null;
  chainId?: BigInt | null;
  type?: UInt32 | null;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_TxOverrides {
  gasLimit?: BigInt | null;
  gasPrice?: BigInt | null;
  value?: BigInt | null;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_StaticTxResult {
  result: String;
  error: Boolean;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_EventNotification {
  data: String;
  address: String;
  log: Types.Ethereum_Log;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_Connection {
  node?: String | null;
  networkNameOrChainId?: String | null;
}

/* URI: "ens/ethereum.web3api.eth" */
export interface Ethereum_Network {
  name: String;
  chainId: BigInt;
  ensAddress?: String | null;
}

/// Imported Objects END ///

/// Imported Queries START ///

/* URI: "ens/helloworld.web3api.eth" */
interface HelloWorld_Query_Input_logMessage extends Record<string, unknown> {
  message: String;
}

/* URI: "ens/helloworld.web3api.eth" */
export const HelloWorld_Query = {
  logMessage: async (
    input: HelloWorld_Query_Input_logMessage,
    client: Client,
    uri: string = "ens/helloworld.web3api.eth"
  ): Promise<InvokeApiResult<Boolean>> => {
    return client.invoke<Boolean>({
      uri,
      module: "query",
      method: "logMessage",
      input
    });
  }
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_callContractView extends Record<string, unknown> {
  address: String;
  method: String;
  args?: Array<String> | null;
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_callContractStatic extends Record<string, unknown> {
  address: String;
  method: String;
  args?: Array<String> | null;
  connection?: Types.Ethereum_Connection | null;
  txOverrides?: Types.Ethereum_TxOverrides | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_getBalance extends Record<string, unknown> {
  address: String;
  blockTag?: BigInt | null;
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_encodeParams extends Record<string, unknown> {
  types: Array<String>;
  values: Array<String>;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_encodeFunction extends Record<string, unknown> {
  method: String;
  args?: Array<String> | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_solidityPack extends Record<string, unknown> {
  types: Array<String>;
  values: Array<String>;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_solidityKeccak256 extends Record<string, unknown> {
  types: Array<String>;
  values: Array<String>;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_soliditySha256 extends Record<string, unknown> {
  types: Array<String>;
  values: Array<String>;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_getSignerAddress extends Record<string, unknown> {
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_getSignerBalance extends Record<string, unknown> {
  blockTag?: BigInt | null;
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_getSignerTransactionCount extends Record<string, unknown> {
  blockTag?: BigInt | null;
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_getGasPrice extends Record<string, unknown> {
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_estimateTransactionGas extends Record<string, unknown> {
  tx: Types.Ethereum_TxRequest;
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_estimateContractCallGas extends Record<string, unknown> {
  address: String;
  method: String;
  args?: Array<String> | null;
  connection?: Types.Ethereum_Connection | null;
  txOverrides?: Types.Ethereum_TxOverrides | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_checkAddress extends Record<string, unknown> {
  address: String;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_toWei extends Record<string, unknown> {
  eth: String;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_toEth extends Record<string, unknown> {
  wei: BigInt;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_awaitTransaction extends Record<string, unknown> {
  txHash: String;
  confirmations: UInt32;
  timeout: UInt32;
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_waitForEvent extends Record<string, unknown> {
  address: String;
  event: String;
  args?: Array<String> | null;
  timeout?: UInt32 | null;
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Query_Input_getNetwork extends Record<string, unknown> {
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
export const Ethereum_Query = {
  callContractView: async (
    input: Ethereum_Query_Input_callContractView,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<String>> => {
    return client.invoke<String>({
      uri,
      module: "query",
      method: "callContractView",
      input
    });
  },

  callContractStatic: async (
    input: Ethereum_Query_Input_callContractStatic,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<Types.Ethereum_StaticTxResult>> => {
    return client.invoke<Types.Ethereum_StaticTxResult>({
      uri,
      module: "query",
      method: "callContractStatic",
      input
    });
  },

  getBalance: async (
    input: Ethereum_Query_Input_getBalance,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<BigInt>> => {
    return client.invoke<BigInt>({
      uri,
      module: "query",
      method: "getBalance",
      input
    });
  },

  encodeParams: async (
    input: Ethereum_Query_Input_encodeParams,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<String>> => {
    return client.invoke<String>({
      uri,
      module: "query",
      method: "encodeParams",
      input
    });
  },

  encodeFunction: async (
    input: Ethereum_Query_Input_encodeFunction,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<String>> => {
    return client.invoke<String>({
      uri,
      module: "query",
      method: "encodeFunction",
      input
    });
  },

  solidityPack: async (
    input: Ethereum_Query_Input_solidityPack,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<String>> => {
    return client.invoke<String>({
      uri,
      module: "query",
      method: "solidityPack",
      input
    });
  },

  solidityKeccak256: async (
    input: Ethereum_Query_Input_solidityKeccak256,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<String>> => {
    return client.invoke<String>({
      uri,
      module: "query",
      method: "solidityKeccak256",
      input
    });
  },

  soliditySha256: async (
    input: Ethereum_Query_Input_soliditySha256,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<String>> => {
    return client.invoke<String>({
      uri,
      module: "query",
      method: "soliditySha256",
      input
    });
  },

  getSignerAddress: async (
    input: Ethereum_Query_Input_getSignerAddress,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<String>> => {
    return client.invoke<String>({
      uri,
      module: "query",
      method: "getSignerAddress",
      input
    });
  },

  getSignerBalance: async (
    input: Ethereum_Query_Input_getSignerBalance,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<BigInt>> => {
    return client.invoke<BigInt>({
      uri,
      module: "query",
      method: "getSignerBalance",
      input
    });
  },

  getSignerTransactionCount: async (
    input: Ethereum_Query_Input_getSignerTransactionCount,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<BigInt>> => {
    return client.invoke<BigInt>({
      uri,
      module: "query",
      method: "getSignerTransactionCount",
      input
    });
  },

  getGasPrice: async (
    input: Ethereum_Query_Input_getGasPrice,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<BigInt>> => {
    return client.invoke<BigInt>({
      uri,
      module: "query",
      method: "getGasPrice",
      input
    });
  },

  estimateTransactionGas: async (
    input: Ethereum_Query_Input_estimateTransactionGas,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<BigInt>> => {
    return client.invoke<BigInt>({
      uri,
      module: "query",
      method: "estimateTransactionGas",
      input
    });
  },

  estimateContractCallGas: async (
    input: Ethereum_Query_Input_estimateContractCallGas,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<BigInt>> => {
    return client.invoke<BigInt>({
      uri,
      module: "query",
      method: "estimateContractCallGas",
      input
    });
  },

  checkAddress: async (
    input: Ethereum_Query_Input_checkAddress,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<Boolean>> => {
    return client.invoke<Boolean>({
      uri,
      module: "query",
      method: "checkAddress",
      input
    });
  },

  toWei: async (
    input: Ethereum_Query_Input_toWei,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<BigInt>> => {
    return client.invoke<BigInt>({
      uri,
      module: "query",
      method: "toWei",
      input
    });
  },

  toEth: async (
    input: Ethereum_Query_Input_toEth,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<String>> => {
    return client.invoke<String>({
      uri,
      module: "query",
      method: "toEth",
      input
    });
  },

  awaitTransaction: async (
    input: Ethereum_Query_Input_awaitTransaction,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<Types.Ethereum_TxReceipt>> => {
    return client.invoke<Types.Ethereum_TxReceipt>({
      uri,
      module: "query",
      method: "awaitTransaction",
      input
    });
  },

  waitForEvent: async (
    input: Ethereum_Query_Input_waitForEvent,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<Types.Ethereum_EventNotification>> => {
    return client.invoke<Types.Ethereum_EventNotification>({
      uri,
      module: "query",
      method: "waitForEvent",
      input
    });
  },

  getNetwork: async (
    input: Ethereum_Query_Input_getNetwork,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<Types.Ethereum_Network>> => {
    return client.invoke<Types.Ethereum_Network>({
      uri,
      module: "query",
      method: "getNetwork",
      input
    });
  }
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Mutation_Input_callContractMethod extends Record<string, unknown> {
  address: String;
  method: String;
  args?: Array<String> | null;
  connection?: Types.Ethereum_Connection | null;
  txOverrides?: Types.Ethereum_TxOverrides | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Mutation_Input_callContractMethodAndWait extends Record<string, unknown> {
  address: String;
  method: String;
  args?: Array<String> | null;
  connection?: Types.Ethereum_Connection | null;
  txOverrides?: Types.Ethereum_TxOverrides | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Mutation_Input_sendTransaction extends Record<string, unknown> {
  tx: Types.Ethereum_TxRequest;
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Mutation_Input_sendTransactionAndWait extends Record<string, unknown> {
  tx: Types.Ethereum_TxRequest;
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Mutation_Input_deployContract extends Record<string, unknown> {
  abi: String;
  bytecode: String;
  args?: Array<String> | null;
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Mutation_Input_signMessage extends Record<string, unknown> {
  message: String;
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
interface Ethereum_Mutation_Input_sendRPC extends Record<string, unknown> {
  method: String;
  params: Array<String>;
  connection?: Types.Ethereum_Connection | null;
}

/* URI: "ens/ethereum.web3api.eth" */
export const Ethereum_Mutation = {
  callContractMethod: async (
    input: Ethereum_Mutation_Input_callContractMethod,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<Types.Ethereum_TxResponse>> => {
    return client.invoke<Types.Ethereum_TxResponse>({
      uri,
      module: "mutation",
      method: "callContractMethod",
      input
    });
  },

  callContractMethodAndWait: async (
    input: Ethereum_Mutation_Input_callContractMethodAndWait,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<Types.Ethereum_TxReceipt>> => {
    return client.invoke<Types.Ethereum_TxReceipt>({
      uri,
      module: "mutation",
      method: "callContractMethodAndWait",
      input
    });
  },

  sendTransaction: async (
    input: Ethereum_Mutation_Input_sendTransaction,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<Types.Ethereum_TxResponse>> => {
    return client.invoke<Types.Ethereum_TxResponse>({
      uri,
      module: "mutation",
      method: "sendTransaction",
      input
    });
  },

  sendTransactionAndWait: async (
    input: Ethereum_Mutation_Input_sendTransactionAndWait,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<Types.Ethereum_TxReceipt>> => {
    return client.invoke<Types.Ethereum_TxReceipt>({
      uri,
      module: "mutation",
      method: "sendTransactionAndWait",
      input
    });
  },

  deployContract: async (
    input: Ethereum_Mutation_Input_deployContract,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<String>> => {
    return client.invoke<String>({
      uri,
      module: "mutation",
      method: "deployContract",
      input
    });
  },

  signMessage: async (
    input: Ethereum_Mutation_Input_signMessage,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<String>> => {
    return client.invoke<String>({
      uri,
      module: "mutation",
      method: "signMessage",
      input
    });
  },

  sendRPC: async (
    input: Ethereum_Mutation_Input_sendRPC,
    client: Client,
    uri: string = "ens/ethereum.web3api.eth"
  ): Promise<InvokeApiResult<String | null>> => {
    return client.invoke<String | null>({
      uri,
      module: "mutation",
      method: "sendRPC",
      input
    });
  }
}

/// Imported Queries END ///
