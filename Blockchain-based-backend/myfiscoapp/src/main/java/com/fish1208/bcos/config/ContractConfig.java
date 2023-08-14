package com.fish1208.bcos.config;

import com.fish1208.bcos.ContractAddress;
import com.fish1208.contract.*;
import lombok.extern.slf4j.Slf4j;
import org.fisco.bcos.sdk.client.Client;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
@ConfigurationProperties(prefix = "contract-address")
public class ContractConfig {

    private String kVRs;


    @Bean
    public KVRs loadKVRs(Client client){
        return KVRs.load(kVRs, client, client.getCryptoSuite().getCryptoKeyPair());
    }


    @Bean
    public ContractAddress setAddress(){
        log.info("kVRs={}", kVRs);
        ContractAddress contractAddress = new ContractAddress();
        contractAddress.setKVRs(kVRs);
        return contractAddress;
    }

    public String getkVRs() {
        return kVRs;
    }

    public void setkVRs(String kVRs) {
        this.kVRs = kVRs;
    }
}
