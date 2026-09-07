// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IHoldRegistry {
    function resolve(
        string calldata handle
    ) external view returns (address);
}

contract HoldResolver {

    IHoldRegistry public immutable registry;

    constructor(address registryAddress) {
        require(
            registryAddress != address(0),
            "Invalid registry"
        );

        registry = IHoldRegistry(
            registryAddress
        );
    }

    function resolve(
        string calldata handle
    ) external view returns (address) {
        return registry.resolve(handle);
    }
}
