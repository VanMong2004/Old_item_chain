// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TransactionStorage {
    struct Record {
        string dataHash;
        uint256 timestamp;
        address sender;
    }

    Record[] public records;

    event RecordStored(
        uint256 indexed recordId,
        string dataHash,
        address sender,
        uint256 timestamp
    );

    function storeRecord(string memory _dataHash) public {
        records.push(Record({
            dataHash: _dataHash,
            timestamp: block.timestamp,
            sender: msg.sender
        }));

        emit RecordStored(
            records.length - 1,
            _dataHash,
            msg.sender,
            block.timestamp
        );
    }

    function getRecord(uint256 _id) public view returns (
        string memory,
        uint256,
        address
    ) {
        Record memory r = records[_id];
        return (r.dataHash, r.timestamp, r.sender);
    }

    function getTotalRecords() public view returns (uint256) {
        return records.length;
    }
}