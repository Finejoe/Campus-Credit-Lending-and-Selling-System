package com.fish1208.controller;

import com.alibaba.fastjson.JSON;
import com.fish1208.common.response.Result;
import com.fish1208.contract.KVRs;
import lombok.extern.slf4j.Slf4j;
import org.fisco.bcos.sdk.abi.datatypes.generated.tuples.generated.Tuple2;
import org.fisco.bcos.sdk.model.TransactionReceipt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/contract/kvrs")
public class RsController {

    @Autowired
    private KVRs rs;

    /**
     *
     * @param id
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public Result<?> get(@RequestParam String id) throws Exception {
        if (rs != null) {
            log.info("KVRs address is: {}", rs.getContractAddress());
            Tuple2<Boolean, String> tuple = rs.get(id);
            return Result.data(tuple);
        }
        return Result.fail("执行KVRs合约失败");
    }

    @RequestMapping(value = "/set", method = RequestMethod.POST)
    public Result<?> set(@RequestBody Map<String,Object> param) throws Exception {
        if (rs != null) {
            log.info("KVRs address is: {}", rs.getContractAddress());
            String id = (String)param.get("id");
            String imghash = (String) param.get("imghash");
            String imgval = (String) param.get("imgval");
            TransactionReceipt receipt = rs.set(id, imghash, imgval);
            log.info("KVRs receipt = {}", JSON.toJSONString(receipt));
            return Result.data(receipt);
        }
        return Result.fail("执行KVRs合约失败");
    }
    @RequestMapping(value = "/check", method = RequestMethod.POST)
    public Result<?> check(@RequestBody Map<String,Object> param) throws Exception {
        if (rs != null) {
            log.info("KVRs address is: {}", rs.getContractAddress());
            String id = (String)param.get("id");
            String imghash = (String) param.get("imghash");
            log.info("input imghash:{}",imghash);
            Tuple2<Boolean, String> tuple = rs.get(id);
            log.info("tuple imghash:{}",tuple.getValue2());
            if(tuple.getValue1()==true) {
                //成功！
                if (imghash.equals(tuple.getValue2())) {
                    return Result.data(tuple);
                } else {
                    //失败
                    return Result.fail("fail");
                }
            }
        }
        return Result.fail("执行KVRs合约失败");
    }
}
