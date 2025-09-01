//priority: 1

GTCEuStartupEvents.registry('gtceu:material', event => {
    GTMaterials.get('andesite_alloy').addFlags(GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_SMALL_GEAR)
})
