pragma solidity>=0.4.24 <0.6.11;

import "./Table.sol";

contract KVRS {
    event SetResult(int256 count);

    KVTableFactory tableFactory;
    string constant TABLE_NAME = "t_kvrs";

    constructor() public {
        //The fixed address is 0x1010 for KVTableFactory
        tableFactory = KVTableFactory(0x1010);
        // the parameters of createTable are tableName,keyField,"vlaueFiled1,vlaueFiled2,vlaueFiled3,..."
        tableFactory.createTable(TABLE_NAME, "id", "imghash,imgval");
    }

    //get record
    function get(string memory id) public view returns (bool, string memory) {
        KVTable table = tableFactory.openTable(TABLE_NAME);
        bool ok = false;
        Entry entry;
        (ok, entry) = table.get(id);
        string memory imghash;
        string memory imgval;
        if (ok) {
            imghash = entry.getString("imghash");
        }
        return (ok, imghash);
    }
    
    //set record
    function set(string memory id, string memory imghash, string memory imgval)
    public
    returns (int256)
    {
        KVTable table = tableFactory.openTable(TABLE_NAME);
        Entry entry = table.newEntry();
        // the length of entry's field value should < 16MB
        entry.set("id", id);
        entry.set("imghash", imghash);
        entry.set("imgval", imgval);
        // the first parameter length of set should <= 255B
        int256 count = table.set(id, entry);
        emit SetResult(count);
        return count;
    }
}
