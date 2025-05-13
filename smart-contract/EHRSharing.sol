// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EHRSharing {

    struct Record {
        string dataGeneratorID;
        string recordID;
    }

    mapping(bytes32 => Record[]) private records;

    /// @notice Index a new EHR record on the blockchain
    /// @param hashedPatientID The hashed identifier for the patient
    /// @param dataGeneratorID The hospital/doctor/lab ID that created the record
    /// @param recordID A pointer to the record (e.g., IPFS hash, database ID)
    function index(bytes32 hashedPatientID, string memory dataGeneratorID, string memory recordID) public {
        records[hashedPatientID].push(Record(dataGeneratorID, recordID));
    }

    /// @notice Access all records for a hashed patient ID
    /// @param hashedPatientID The hashed patient identity
    /// @return An array of records
    function access(bytes32 hashedPatientID) public view returns (Record[] memory) {
        return records[hashedPatientID];
    }
}
