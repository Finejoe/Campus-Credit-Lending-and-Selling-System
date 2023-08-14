package com.fish1208.contract;

import org.fisco.bcos.sdk.abi.FunctionReturnDecoder;
import org.fisco.bcos.sdk.abi.TypeReference;
import org.fisco.bcos.sdk.abi.datatypes.*;
import org.fisco.bcos.sdk.abi.datatypes.generated.Int256;
import org.fisco.bcos.sdk.abi.datatypes.generated.tuples.generated.Tuple1;
import org.fisco.bcos.sdk.abi.datatypes.generated.tuples.generated.Tuple2;
import org.fisco.bcos.sdk.abi.datatypes.generated.tuples.generated.Tuple3;
import org.fisco.bcos.sdk.client.Client;
import org.fisco.bcos.sdk.contract.Contract;
import org.fisco.bcos.sdk.crypto.CryptoSuite;
import org.fisco.bcos.sdk.crypto.keypair.CryptoKeyPair;
import org.fisco.bcos.sdk.eventsub.EventCallback;
import org.fisco.bcos.sdk.model.CryptoType;
import org.fisco.bcos.sdk.model.TransactionReceipt;
import org.fisco.bcos.sdk.model.callback.TransactionCallback;
import org.fisco.bcos.sdk.transaction.model.exception.ContractException;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@SuppressWarnings("unchecked")
public class KVRs extends Contract {
    public static final String[] BINARY_ARRAY = {"608060405234801561001057600080fd5b506110106000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166356004b6a6040805190810160405280600681526020017f745f6b76727300000000000000000000000000000000000000000000000000008152506040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180806020018060200180602001848103845285818151815260200191508051906020019080838360005b8381101561013957808201518184015260208101905061011e565b50505050905090810190601f1680156101665780820380516001836020036101000a031916815260200191505b50848103835260028152602001807f69640000000000000000000000000000000000000000000000000000000000008152506020018481038252600e8152602001807f696d67686173682c696d6776616c000000000000000000000000000000000000815250602001945050505050602060405180830381600087803b1580156101ef57600080fd5b505af1158015610203573d6000803e3d6000fd5b505050506040513d602081101561021957600080fd5b810190808051906020019092919050505050610d5a8061023a6000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063693ec85e14610051578063da465d741461013e575b600080fd5b34801561005d57600080fd5b506100b8600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610247565b604051808315151515815260200180602001828103825283818151815260200191508051906020019080838360005b838110156101025780820151818401526020810190506100e7565b50505050905090810190601f16801561012f5780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b34801561014a57600080fd5b50610231600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610628565b6040518082815260200191505060405180910390f35b6000606060008060006060806000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f23f63c96040805190810160405280600681526020017f745f6b76727300000000000000000000000000000000000000000000000000008152506040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610331578082015181840152602081019050610316565b50505050905090810190601f16801561035e5780820380516001836020036101000a031916815260200191505b5092505050602060405180830381600087803b15801561037d57600080fd5b505af1158015610391573d6000803e3d6000fd5b505050506040513d60208110156103a757600080fd5b81019080805190602001909291905050509450600093508473ffffffffffffffffffffffffffffffffffffffff1663693ec85e896040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561044657808201518184015260208101905061042b565b50505050905090810190601f1680156104735780820380516001836020036101000a031916815260200191505b50925050506040805180830381600087803b15801561049157600080fd5b505af11580156104a5573d6000803e3d6000fd5b505050506040513d60408110156104bb57600080fd5b81019080805190602001909291908051906020019092919050505080945081955050508315610618578273ffffffffffffffffffffffffffffffffffffffff16639c981fcb6040518163ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018080602001828103825260078152602001807f696d676861736800000000000000000000000000000000000000000000000000815250602001915050600060405180830381600087803b15801561058457600080fd5b505af1158015610598573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525060208110156105c257600080fd5b8101908080516401000000008111156105da57600080fd5b828101905060208101848111156105f057600080fd5b815185600182028301116401000000008211171561060d57600080fd5b505092919050505091505b8382965096505050505050915091565b6000806000806000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f23f63c96040805190810160405280600681526020017f745f6b76727300000000000000000000000000000000000000000000000000008152506040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561070c5780820151818401526020810190506106f1565b50505050905090810190601f1680156107395780820380516001836020036101000a031916815260200191505b5092505050602060405180830381600087803b15801561075857600080fd5b505af115801561076c573d6000803e3d6000fd5b505050506040513d602081101561078257600080fd5b810190808051906020019092919050505092508273ffffffffffffffffffffffffffffffffffffffff166313db93466040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b1580156107f957600080fd5b505af115801561080d573d6000803e3d6000fd5b505050506040513d602081101561082357600080fd5b810190808051906020019092919050505091508173ffffffffffffffffffffffffffffffffffffffff1663e942b516886040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200180602001838103835260028152602001807f6964000000000000000000000000000000000000000000000000000000000000815250602001838103825284818151815260200191508051906020019080838360005b838110156108f65780820151818401526020810190506108db565b50505050905090810190601f1680156109235780820380516001836020036101000a031916815260200191505b509350505050600060405180830381600087803b15801561094357600080fd5b505af1158015610957573d6000803e3d6000fd5b505050508173ffffffffffffffffffffffffffffffffffffffff1663e942b516876040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200180602001838103835260078152602001807f696d676861736800000000000000000000000000000000000000000000000000815250602001838103825284818151815260200191508051906020019080838360005b83811015610a1b578082015181840152602081019050610a00565b50505050905090810190601f168015610a485780820380516001836020036101000a031916815260200191505b509350505050600060405180830381600087803b158015610a6857600080fd5b505af1158015610a7c573d6000803e3d6000fd5b505050508173ffffffffffffffffffffffffffffffffffffffff1663e942b516866040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200180602001838103835260068152602001807f696d6776616c0000000000000000000000000000000000000000000000000000815250602001838103825284818151815260200191508051906020019080838360005b83811015610b40578082015181840152602081019050610b25565b50505050905090810190601f168015610b6d5780820380516001836020036101000a031916815260200191505b509350505050600060405180830381600087803b158015610b8d57600080fd5b505af1158015610ba1573d6000803e3d6000fd5b505050508273ffffffffffffffffffffffffffffffffffffffff1663a815ff1588846040518363ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180806020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828103825284818151815260200191508051906020019080838360005b83811015610c60578082015181840152602081019050610c45565b50505050905090810190601f168015610c8d5780820380516001836020036101000a031916815260200191505b509350505050602060405180830381600087803b158015610cad57600080fd5b505af1158015610cc1573d6000803e3d6000fd5b505050506040513d6020811015610cd757600080fd5b810190808051906020019092919050505090507fb103249d88cd818b10c5cd6889874103a7699c5834cb078d8f35925dca8a62d6816040518082815260200191505060405180910390a180935050505093925050505600a165627a7a72305820efacfe28f9ffbe38b4ad3ed00d3454a053827d84ed775adf14dab1997b59496b0029"};

    public static final String BINARY = org.fisco.bcos.sdk.utils.StringUtils.joinAll("", BINARY_ARRAY);

    public static final String[] SM_BINARY_ARRAY = {"608060405234801561001057600080fd5b506110106000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c92a78016040805190810160405280600681526020017f745f6b76727300000000000000000000000000000000000000000000000000008152506040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180806020018060200180602001848103845285818151815260200191508051906020019080838360005b8381101561013957808201518184015260208101905061011e565b50505050905090810190601f1680156101665780820380516001836020036101000a031916815260200191505b50848103835260028152602001807f69640000000000000000000000000000000000000000000000000000000000008152506020018481038252600e8152602001807f696d67686173682c696d6776616c000000000000000000000000000000000000815250602001945050505050602060405180830381600087803b1580156101ef57600080fd5b505af1158015610203573d6000803e3d6000fd5b505050506040513d602081101561021957600080fd5b810190808051906020019092919050505050610d5a8061023a6000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063095bf8fa146100515780637b1b8e031461015a575b600080fd5b34801561005d57600080fd5b50610144600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610247565b6040518082815260200191505060405180910390f35b34801561016657600080fd5b506101c1600480360381019080803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919291929050505061094d565b604051808315151515815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561020b5780820151818401526020810190506101f0565b50505050905090810190601f1680156102385780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b6000806000806000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166359a48b656040805190810160405280600681526020017f745f6b76727300000000000000000000000000000000000000000000000000008152506040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561032b578082015181840152602081019050610310565b50505050905090810190601f1680156103585780820380516001836020036101000a031916815260200191505b5092505050602060405180830381600087803b15801561037757600080fd5b505af115801561038b573d6000803e3d6000fd5b505050506040513d60208110156103a157600080fd5b810190808051906020019092919050505092508273ffffffffffffffffffffffffffffffffffffffff16635887ab246040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15801561041857600080fd5b505af115801561042c573d6000803e3d6000fd5b505050506040513d602081101561044257600080fd5b810190808051906020019092919050505091508173ffffffffffffffffffffffffffffffffffffffff16631a391cb4886040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200180602001838103835260028152602001807f6964000000000000000000000000000000000000000000000000000000000000815250602001838103825284818151815260200191508051906020019080838360005b838110156105155780820151818401526020810190506104fa565b50505050905090810190601f1680156105425780820380516001836020036101000a031916815260200191505b509350505050600060405180830381600087803b15801561056257600080fd5b505af1158015610576573d6000803e3d6000fd5b505050508173ffffffffffffffffffffffffffffffffffffffff16631a391cb4876040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200180602001838103835260078152602001807f696d676861736800000000000000000000000000000000000000000000000000815250602001838103825284818151815260200191508051906020019080838360005b8381101561063a57808201518184015260208101905061061f565b50505050905090810190601f1680156106675780820380516001836020036101000a031916815260200191505b509350505050600060405180830381600087803b15801561068757600080fd5b505af115801561069b573d6000803e3d6000fd5b505050508173ffffffffffffffffffffffffffffffffffffffff16631a391cb4866040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808060200180602001838103835260068152602001807f696d6776616c0000000000000000000000000000000000000000000000000000815250602001838103825284818151815260200191508051906020019080838360005b8381101561075f578082015181840152602081019050610744565b50505050905090810190601f16801561078c5780820380516001836020036101000a031916815260200191505b509350505050600060405180830381600087803b1580156107ac57600080fd5b505af11580156107c0573d6000803e3d6000fd5b505050508273ffffffffffffffffffffffffffffffffffffffff1663517c4dd988846040518363ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180806020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828103825284818151815260200191508051906020019080838360005b8381101561087f578082015181840152602081019050610864565b50505050905090810190601f1680156108ac5780820380516001836020036101000a031916815260200191505b509350505050602060405180830381600087803b1580156108cc57600080fd5b505af11580156108e0573d6000803e3d6000fd5b505050506040513d60208110156108f657600080fd5b810190808051906020019092919050505090507f8425f908744b84757cbeb3eda153cd3971c5a3fdecc6e6d18a6a223d52ca763f816040518082815260200191505060405180910390a18093505050509392505050565b6000606060008060006060806000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166359a48b656040805190810160405280600681526020017f745f6b76727300000000000000000000000000000000000000000000000000008152506040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610a37578082015181840152602081019050610a1c565b50505050905090810190601f168015610a645780820380516001836020036101000a031916815260200191505b5092505050602060405180830381600087803b158015610a8357600080fd5b505af1158015610a97573d6000803e3d6000fd5b505050506040513d6020811015610aad57600080fd5b81019080805190602001909291905050509450600093508473ffffffffffffffffffffffffffffffffffffffff16637b1b8e03896040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610b4c578082015181840152602081019050610b31565b50505050905090810190601f168015610b795780820380516001836020036101000a031916815260200191505b50925050506040805180830381600087803b158015610b9757600080fd5b505af1158015610bab573d6000803e3d6000fd5b505050506040513d6040811015610bc157600080fd5b81019080805190602001909291908051906020019092919050505080945081955050508315610d1e578273ffffffffffffffffffffffffffffffffffffffff16639bca41e86040518163ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018080602001828103825260078152602001807f696d676861736800000000000000000000000000000000000000000000000000815250602001915050600060405180830381600087803b158015610c8a57600080fd5b505af1158015610c9e573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052506020811015610cc857600080fd5b810190808051640100000000811115610ce057600080fd5b82810190506020810184811115610cf657600080fd5b8151856001820283011164010000000082111715610d1357600080fd5b505092919050505091505b83829650965050505050509150915600a165627a7a723058207d8a9827c3c654b50004a85f8c703a3e1183fce654f03d93dde75dbc67ef54b30029"};

    public static final String SM_BINARY = org.fisco.bcos.sdk.utils.StringUtils.joinAll("", SM_BINARY_ARRAY);

    public static final String[] ABI_ARRAY = {"[{\"constant\":true,\"inputs\":[{\"name\":\"id\",\"type\":\"string\"}],\"name\":\"get\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"},{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"id\",\"type\":\"string\"},{\"name\":\"imghash\",\"type\":\"string\"},{\"name\":\"imgval\",\"type\":\"string\"}],\"name\":\"set\",\"outputs\":[{\"name\":\"\",\"type\":\"int256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"count\",\"type\":\"int256\"}],\"name\":\"SetResult\",\"type\":\"event\"}]"};

    public static final String ABI = org.fisco.bcos.sdk.utils.StringUtils.joinAll("", ABI_ARRAY);

    public static final String FUNC_GET = "get";

    public static final String FUNC_SET = "set";

    public static final Event SETRESULT_EVENT = new Event("SetResult", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Int256>() {}));
    ;

    protected KVRs(String contractAddress, Client client, CryptoKeyPair credential) {
        super(getBinary(client.getCryptoSuite()), contractAddress, client, credential);
    }

    public static String getBinary(CryptoSuite cryptoSuite) {
        return (cryptoSuite.getCryptoTypeConfig() == CryptoType.ECDSA_TYPE ? BINARY : SM_BINARY);
    }

    public Tuple2<Boolean, String> get(String id) throws ContractException {
        final Function function = new Function(FUNC_GET, 
                Arrays.<Type>asList(new Utf8String(id)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}, new TypeReference<Utf8String>() {}));
        List<Type> results = executeCallWithMultipleValueReturn(function);
        return new Tuple2<Boolean, String>(
                (Boolean) results.get(0).getValue(), 
                (String) results.get(1).getValue());
    }

    public TransactionReceipt set(String id, String imghash, String imgval) {
        final Function function = new Function(
                FUNC_SET, 
                Arrays.<Type>asList(new Utf8String(id),
                new Utf8String(imghash),
                new Utf8String(imgval)),
                Collections.<TypeReference<?>>emptyList());
        return executeTransaction(function);
    }

    public void set(String id, String imghash, String imgval, TransactionCallback callback) {
        final Function function = new Function(
                FUNC_SET, 
                Arrays.<Type>asList(new Utf8String(id),
                new Utf8String(imghash),
                new Utf8String(imgval)),
                Collections.<TypeReference<?>>emptyList());
         asyncExecuteTransaction(function, callback);
    }

    public String getSignedTransactionForSet(String id, String imghash, String imgval) {
        final Function function = new Function(
                FUNC_SET, 
                Arrays.<Type>asList(new Utf8String(id),
                new Utf8String(imghash),
                new Utf8String(imgval)),
                Collections.<TypeReference<?>>emptyList());
        return createSignedTransaction(function);
    }

    public Tuple3<String, String, String> getSetInput(TransactionReceipt transactionReceipt) {
        String data = transactionReceipt.getInput().substring(10);
        final Function function = new Function(FUNC_SET, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}));
        List<Type> results = FunctionReturnDecoder.decode(data, function.getOutputParameters());
        return new Tuple3<String, String, String>(

                (String) results.get(0).getValue(), 
                (String) results.get(1).getValue(), 
                (String) results.get(2).getValue()
                );
    }

    public Tuple1<BigInteger> getSetOutput(TransactionReceipt transactionReceipt) {
        String data = transactionReceipt.getOutput();
        final Function function = new Function(FUNC_SET, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Int256>() {}));
        List<Type> results = FunctionReturnDecoder.decode(data, function.getOutputParameters());
        return new Tuple1<BigInteger>(

                (BigInteger) results.get(0).getValue()
                );
    }

    public List<SetResultEventResponse> getSetResultEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(SETRESULT_EVENT, transactionReceipt);
        ArrayList<SetResultEventResponse> responses = new ArrayList<SetResultEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            SetResultEventResponse typedResponse = new SetResultEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.count = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public void subscribeSetResultEvent(String fromBlock, String toBlock, List<String> otherTopics, EventCallback callback) {
        String topic0 = eventEncoder.encode(SETRESULT_EVENT);
        subscribeEvent(ABI,BINARY,topic0,fromBlock,toBlock,otherTopics,callback);
    }

    public void subscribeSetResultEvent(EventCallback callback) {
        String topic0 = eventEncoder.encode(SETRESULT_EVENT);
        subscribeEvent(ABI,BINARY,topic0,callback);
    }

    public static KVRs load(String contractAddress, Client client, CryptoKeyPair credential) {
        return new KVRs(contractAddress, client, credential);
    }

    public static KVRs deploy(Client client, CryptoKeyPair credential) throws ContractException {
        return deploy(KVRs.class, client, credential, getBinary(client.getCryptoSuite()), "");
    }

    public static class SetResultEventResponse {
        public TransactionReceipt.Logs log;

        public BigInteger count;
    }
}
