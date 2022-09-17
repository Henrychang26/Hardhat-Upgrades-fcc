const { deployments, getNamedAccounts, network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { veriify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const boxv2 = await deploy("BoxV2", {
        from: deployer,
        log: true,
        args: [],
        waitConfirmations: network.config.blockConfirmations,
    })
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying....")
        await veriify(boxv2.address, [])
    }
}
