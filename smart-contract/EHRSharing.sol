// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EHRSharing {

    struct Record {
        string dataGeneratorID;  // hashed hospital
        string recordID;         // hashed recordID
    }

    mapping(bytes32 => Record[]) private records; // key = hashed patient email
    bytes32[] private allPatients;
    mapping(bytes32 => bool) private seen;

    event RecordIndexed(bytes32 indexed patientHash, string dataGeneratorID, string recordID);

    function index(bytes32 hashedPatientID, string memory dataGeneratorID, string memory recordID) public {
        if (!seen[hashedPatientID]) {
            allPatients.push(hashedPatientID);
            seen[hashedPatientID] = true;
        }
        records[hashedPatientID].push(Record(dataGeneratorID, recordID));
        emit RecordIndexed(hashedPatientID, dataGeneratorID, recordID);
    }

    function access(bytes32 hashedPatientID) public view returns (Record[] memory) {
        return records[hashedPatientID];
    }

    function getAllPatients() public view returns (bytes32[] memory) {
        return allPatients;
    }
}
