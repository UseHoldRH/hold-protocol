// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract HoldRegistry {
    struct Handle {
        address owner;
        address wallet;
    }

    mapping(bytes32 => Handle) private handles;

    event HandleRegistered(
        string handle,
        address indexed owner,
        address indexed wallet
    );

    event WalletUpdated(
        string handle,
        address indexed wallet
    );

    event HandleReleased(
        string handle,
        address indexed owner
    );

    function _key(string memory handle)
        internal
        pure
        returns (bytes32)
    {
        return keccak256(
            abi.encodePacked(
                _normalize(handle)
            )
        );
    }

    function _normalize(string memory input)
        internal
        pure
        returns (string memory)
    {
        bytes memory data = bytes(input);

        for (uint256 i = 0; i < data.length; i++) {
            if (
                data[i] >= 0x41 &&
                data[i] <= 0x5A
            ) {
                data[i] = bytes1(
                    uint8(data[i]) + 32
                );
            }
        }

        return string(data);
    }

    function register(
        string calldata handle,
        address wallet
    ) external {
        require(
            bytes(handle).length >= 1,
            "Invalid handle"
        );

        require(
            wallet != address(0),
            "Invalid wallet"
        );

        bytes32 key = _key(handle);

        require(
            handles[key].owner == address(0),
            "Handle already registered"
        );

        handles[key] = Handle({
            owner: msg.sender,
            wallet: wallet
        });

        emit HandleRegistered(
            handle,
            msg.sender,
            wallet
        );
    }

    function updateWallet(
        string calldata handle,
        address wallet
    ) external {
        require(
            wallet != address(0),
            "Invalid wallet"
        );

        bytes32 key = _key(handle);

        require(
            handles[key].owner == msg.sender,
            "Not handle owner"
        );

        handles[key].wallet = wallet;

        emit WalletUpdated(
            handle,
            wallet
        );
    }

    function release(
        string calldata handle
    ) external {
        bytes32 key = _key(handle);

        require(
            handles[key].owner == msg.sender,
            "Not handle owner"
        );

        delete handles[key];

        emit HandleReleased(
            handle,
            msg.sender
        );
    }

    function resolve(
        string calldata handle
    ) external view returns (address) {
        bytes32 key = _key(handle);

        return handles[key].wallet;
    }

    function ownerOf(
        string calldata handle
    ) external view returns (address) {
        bytes32 key = _key(handle);

        return handles[key].owner;
    }

    function exists(
        string calldata handle
    ) external view returns (bool) {
        bytes32 key = _key(handle);

        return handles[key].owner != address(0);
    }
}
