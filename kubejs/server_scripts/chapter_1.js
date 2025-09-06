// priority: 0

// Visit the wiki for more info - https://kubejs.com/

console.info('Chapter 1 scripts loading...')

let id = "tundratech:"

ServerEvents.recipes(event => {


    const $GTCEuAPI = Java.loadClass('com.gregtechceu.gtceu.api.GTCEuAPI')
    const $MATERIAL_FLAG = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.material.info.MaterialFlag')
    const $PROPERTY_KEY = Java.loadClass('com.gregtechceu.gtceu.api.data.chemical.material.properties.PropertyKey')

    const ice = ['minecraft:ice', 'minecraft:packed_ice', 'minecraft:blue_ice']

    /*
    $GTCEuAPI.materialManager.getRegistries().forEach(registry => { //get material registries from GTCEu API
        registry.getAllMaterials().forEach(material => { //get all GTCEu materials
            materials.push(material) //append to materials[] in format 'modid:material'
        })
    })
    */

    //Remove unused recipes
    event.remove({output:   'gtceu:treated_wood_planks'})
    //event.remove({output:   'gtceu:brass_dust',                 type: 'minecraft:shapeless'})
    event.remove({output:   'gtceu:wood_dust',                  type: 'greate:milling'})
    event.remove({output:   'minecraft:cobblestone',            input: 'minecraft:andesite'})
    event.remove({output:   'gtceu:compressed_coke_clay'})
    event.remove({type:     'createaddition:rolling'})
    event.remove({output:   'createaddition:rolling_mill'})
    event.remove({output:   'greate:andesite_alloy_mechanical_press'})
    event.remove({output:   'greate:andesite_alloy_cogwheel'})
    event.remove({output:   'greate:large_andesite_alloy_cogwheel'})
    event.remove({output:   'greate:andesite_alloy_mechanical_saw'})
    event.remove({output:   'greate:andesite_alloy_encased_fan'})
    event.remove({output:   'greate:andesite_alloy_millstone'})
    event.remove({output:   'greate:andesite_alloy_mechanical_pump'})
    event.remove({output:   '#' + id + 'unused' })
    event.remove({output:   'create:basin'})
    event.remove({output:   'create:spout'})
    event.remove({output:   'create:fluid_tank'})
    event.remove({output:   'create:water_wheel'})
    event.remove({output:   'create:large_water_wheel'})
    event.remove({output:   'vintageimprovements:centrifuge'})
    event.remove({id:       'gtceu:shaped/wrought_iron_alloy'})
    event.remove({id:       'gtceu:shapeless/dust_brass'})
    event.remove({output:   'greate:andesite_alloy_mechanical_mixer'})
    event.remove({id:       'greate:mixing/integration/gtceu/mixer/brass'})

    //Modifying recipes that use sheets from create deco, etc.
    event.replaceInput({ input: 'createdeco:andesite_sheet' }, 'createdeco:andesite_sheet', '#forge:plates/andesite_alloy')
    event.replaceInput({ input: 'createdeco:industrial_iron_sheet' }, 'createdeco:industrial_iron_sheet', '#forge:plates/wrought_iron')
    event.replaceInput({ output: 'create:brass_hand' }, '#forge:plates/brass', '#forge:plates/gold')
    event.replaceInput({ mod: 'create' }, 'minecraft:quartz', '#' + id + 'quartz')

    //Crafting - Shapeless
    event.shapeless(Item.of('gtceu:andesite_alloy_dust'), ['2x gtceu:andesite_dust', 'gtceu:small_iron_dust'])
    event.shapeless(Item.of('gtceu:andesite_dust'), ['#forge:tools/mortars', 'minecraft:andesite'])
    event.shapeless(Item.of('greate:andesite_alloy_cogwheel'), ['greate:andesite_alloy_shaft', '#minecraft:planks'])
    event.shapeless(Item.of('greate:large_andesite_alloy_cogwheel'), ['greate:andesite_alloy_shaft', '2x #minecraft:planks'])

    event.recipes.vintageimprovements.vacuumizing([Fluid.of('gtceu:steam', 5)], Fluid.water(5))
    .secondaryFluidOutput(0)
    .processingTime(1)
    .heated()
    ice.forEach(ice => {
        event.recipes.vintageimprovements.pressurizing([Fluid.of('gtceu:distilled_water', 20), Item.of(ice)], [Fluid.of('gtceu:steam', 25), Item.of(ice)])
        .secondaryFluidInput(0)
        .processingTime(25)
    })

    //Crafting - Shaped
    /*
     *
     *  H: tool + 'hammers'
     *  M: tool + 'mortars'
     *  L: tool + 'mallets'
     *  F: tool + 'files'
     *  T: tool + 'wire_cutters'
     *  S: tool + 'saws'
     *  V: tool + 'screwdrivers'
     *  W: tool + 'wrenches'
     *  K: tool + 'knives'
     *  R: tool + 'crowbars'
     *
     */

    let tool = '#gtceu:tools/crafting_'

    event.shaped('create:water_wheel', [
        'AAA',
        'ABA',
        'AAA'
    ], {
        A: '#minecraft:planks',
        B: '#forge:shafts'
    })
    event.shaped('create:large_water_wheel', [
        'AAA',
        'ABA',
        'AAA'
    ], {
        A: '#minecraft:planks',
        B: 'create:water_wheel'
    })

    event.shaped('create:spout', [
        'ABA',
        'CCC',
        'FDW'
    ], {
        A: '#forge:plates/copper',
        B: 'create:fluid_tank',
        C: 'minecraft:dried_kelp',
        D: 'gtceu:copper_ring',
        F: tool + 'files',
        W: tool + 'wrenches'
    })

    event.shaped('create:fluid_tank', [
        'ABA',
        'BCB',
        'ABA'
    ], {
        A: 'gtceu:copper_screw',
        B: '#forge:plates/copper',
        C: '#forge:glass_panes/colorless'
    })

    event.shaped('greate:andesite_alloy_mechanical_pump', [
        'ABA',
        'FCL'
    ], {
        A: 'gtceu:treated_wood_normal_fluid_pipe',
        B: 'greate:andesite_alloy_cogwheel',
        C: id + 'simple_mechanism',
        F: tool + 'files',
        L: tool + 'mallets'
    })

    event.shaped('greate:andesite_alloy_mechanical_saw', [
        'ABA',
        'CDC',
        'HEW'
    ], {
        A: 'gtceu:tin_alloy_small_fluid_pipe',
        B: 'gtceu:andesite_alloy_buzz_saw_blade',
        C: id + 'simple_mechanism',
        D: 'create:andesite_casing',
        E: 'greate:andesite_alloy_shaft',
        H: tool + 'hammers',
        W: tool + 'wrenches'
    })
    event.shaped('greate:andesite_alloy_encased_fan', [
        'ABA',
        'CDC',
        'FEW'
    ], {
        A: 'gtceu:andesite_alloy_plate',
        B: 'gtceu:andesite_alloy_rotor',
        C: id + 'simple_mechanism',
        D: 'create:andesite_casing',
        E: 'greate:andesite_alloy_shaft',
        F: tool + 'files',
        W: tool + 'wrenches'
    })

    event.shaped(id + 'simple_mechanism', [
        'AHA',
        'BCB',
        'DBD'
    ], {
        A: 'gtceu:copper_single_wire',
        B: 'gtceu:small_iron_gear',
        C: 'gtceu:treated_wood_slab',
        D: 'gtceu:sticky_resin',
        H: tool + 'hammers'
    })

    event.shaped('3x gtceu:treated_wood_planks', [
        ' A ',
        'BBB'
    ], {
        A: 'gtceu:creosote_bucket',
        B: '#minecraft:planks'
    })

    event.shaped('create:basin', [
        'A A',
        'BAB'
    ], {
        A: '#forge:plates/iron',
        B: 'create:andesite_alloy'
    })

    event.shaped('vintageimprovements:centrifuge', [
        'ABA',
        'ACA',
        'HDS'
    ], {
        A: 'gtceu:treated_wood_normal_fluid_pipe',
        B: '#forge:shafts',
        C: 'gtceu:treated_wood_frame',
        D: 'create:andesite_casing',
        H: tool + 'hammers',
        S: tool + 'saws'
    })

    event.recipes.gtceu.shaped('createaddition:rolling_mill', [
        'ABA',
        'CBC',
        'VDW'
    ], {
        A: 'gtceu:andesite_alloy_plate',
        B: 'greate:andesite_alloy_shaft',
        C: 'gtceu:andesite_alloy_screw',
        D: 'create:andesite_casing',
        V: tool + 'screwdrivers',
        W: tool + 'wrenches'
    }).addMaterialInfo()

    event.recipes.gtceu.shaped('greate:andesite_alloy_mechanical_press', [
        ' B ',
        'CDC',
        'HEV'
    ], {
        C: 'gtceu:andesite_alloy_screw',
        B: 'greate:andesite_alloy_shaft',
        D: 'create:andesite_casing',
        E: 'create:andesite_alloy_block',
        H: tool + 'hammers',
        V: tool + 'screwdrivers'
    }).addMaterialInfo()

    event.shaped('greate:andesite_alloy_mechanical_mixer', [
        ' A ',
        'BCB',
        'WDH'
    ], {
        A: 'greate:andesite_alloy_cogwheel',
        B: id + 'simple_mechanism',
        C: 'create:andesite_casing',
        D: 'gtceu:andesite_alloy_whisk',
        H: tool + 'hammers',
        W: tool + 'wrenches'
    })

    event.shaped('greate:andesite_alloy_millstone', [
        'WAH',
        'BCB',
        'DED'
    ], {
        A: 'greate:andesite_alloy_cogwheel',
        B: id + 'simple_mechanism',
        C: 'create:andesite_casing',
        D: 'create:andesite_alloy',
        E: 'greate:andesite_alloy_shaft',
        H: tool + 'hammers',
        W: tool + 'wrenches'
    })

    //Create Additions: Rolling Mill
    $GTCEuAPI.materialManager.getRegistries().forEach(registry => { //get material registries from GTCEu API
        registry.getAllMaterials().forEach(material => { //get all GTCEu materials
            if (material.hasFlag($MATERIAL_FLAG.getByName('GENERATE_ROD')) && material.hasProperty($PROPERTY_KEY.INGOT)) { //search for GENERATE_ROD flag and INGOT properties
                let name = material.toString()
                let input = name + "_ingot"
                let result = name + "_rod"
                if(name.equals("gtceu:copper") || name.equals("gtceu:gold") || name.equals("gtceu:iron")) { //Fix how vanilla materials are named
                    input = name.replace("gtceu:", "minecraft:") + "_ingot"
                    result = name + "_rod"
                } else if(name.equals("greate:refined_radiance") || name.equals("greate:chromatic_compound") || name.equals("greate:shadow_steel")) { //Fix how Greate materials are named
                    input = name.replace("greate:", "gtceu:") + "_ingot"
                    result = name.replace("greate:", "gtceu:") + "_rod"
                } else if(name.equals("greate:andesite_alloy")) { //Special case for andesite alloy because it doesn't need '_ingot'
                    input = name.replace("greate:", "create:")
                    result = name.replace("greate:", "gtceu:") + "_rod"
                }
                let id_name = name.replace(":", "/")
                event.custom({
                    "type": "createaddition:rolling",
                    "input": { "item": input },
                    "result": { "item": result, "count": 2 }
                }).id(id + 'createaddition/' + id_name)
            }
        })
    })

    //Compacting
    event.custom({
        "type": "create:compacting",
        "ingredients": [
            { "tag": "minecraft:sand", "count": 5},
            { "item": "minecraft:clay_ball", "count": 3}
        ],
        "results": [{ "item": "gtceu:compressed_coke_clay", "count": 3 }]
    })

    //Mixing
    event.custom({
        "type": "greate:mixing",
        "recipeTier": 0,
        "ingredients": [
            { "tag": "minecraft:planks" },
            { "fluid": "gtceu:creosote", "amount": 125 }
        ],
        "results": [{ "item": "gtceu:treated_wood_planks" }]
    })
    event.recipes.greate.pressing('gtceu:bronze_plate', 'gtceu:bronze_ingot').recipeTier(0).circuitNumber(0)
    event.recipes.greate.pressing('gtceu:andesite_alloy_plate', 'create:andesite_alloy').recipeTier(0).circuitNumber(0)
    //Milling
    event.recipes.greate.milling('gtceu:treated_wood_dust','gtceu:treated_wood_planks')


    //Sequenced Assembly
    //
    //
    //
    //Mechanisms
    let inter = id + 'incomplete_steam_mechanism'
    event.recipes.create.sequenced_assembly([
        id + 'steam_mechanism'
    ], 'gtceu:copper_plate', [
        event.recipes.createDeploying(inter, [inter, '#forge:cogwheels']),
        event.recipes.createDeploying(inter, [inter, 'gtceu:bronze_small_fluid_pipe']),
        event.recipes.createDeploying(inter, [inter, '#gtceu:tools/crafting_wrenches']),
    ]).transitionalItem(inter).loops(3).id(id + "steam_mechanism")

    inter = id + 'incomplete_simple_mechanism'
    event.recipes.create.sequenced_assembly([
        id + 'simple_mechanism'
    ], 'gtceu:treated_wood_slab', [
        event.recipes.createDeploying(inter, [inter, 'gtceu:small_iron_gear']),
        event.recipes.createDeploying(inter, [inter, 'gtceu:copper_single_wire']),
        event.recipes.createFilling(inter, [inter, Fluid.of('gtceu:glue', 50)]),
        event.recipes.createPressing(inter, inter)
    ]).transitionalItem(inter).loops(2).id(id + "simple_mechanism")

    event.recipes.create.sequenced_assembly([
        id + 'simple_mechanism'
    ], 'gtceu:treated_wood_plate', [
        event.recipes.createDeploying(inter, [inter, 'gtceu:small_iron_gear']),
        event.recipes.createDeploying(inter, [inter, 'gtceu:copper_single_wire']),
        event.recipes.createFilling(inter, [inter, Fluid.of('gtceu:glue', 100)]),
        event.recipes.createPressing(inter, inter)
    ]).transitionalItem(inter).loops(1).id(id + "simple_mechanism_cheaper")











})
