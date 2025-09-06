// priority: 1

let id = "tundratech:"

ServerEvents.tags('item', event => {
    event.add('forge:plates/charged/iron', 'create_new_age:overcharged_iron_sheet')
    event.add('forge:plates/charged/gold', 'create_new_age:overcharged_golden_sheet')
    event.add('forge:plates/andesite_alloy', 'createdeco:andesite_sheet')
    event.add('forge:plates/zinc', 'createdeco:zinc_sheet')
    event.add('forge:plates/netherite', 'createdeco:netherite_sheet')
    event.add('forge:plates/wrought_iron', 'createdeco:industrial_iron_sheet')
    event.add('forge:stripped_logs', 'gtceu:stripped_rubber_log')

    event.add( id + 'quartz', 'forge:gems/certus_quartz')
    event.add( id + 'quartz', 'forge:gems/quartz')

    let cna = 'create_new_age:'
    //event.add(id + 'unused', cna + 'heater')
    //event.add(id + 'unused', cna + 'heat_pipe')
    //event.add(id + 'unused', cna + 'heat_pump')
    event.add(id + 'unused', cna + 'stirling_engine')
    event.add(id + 'unused', cna + 'solid_corium')
    event.add(id + 'unused', cna + 'corium')
    event.add(id + 'unused', cna + 'reactor_rod')
    event.add(id + 'unused', cna + 'reactor_glass')
    event.add(id + 'unused', cna + 'reactor_fuel_acceptor')
    event.add(id + 'unused', cna + 'reactor_heat_vent')
    //event.add(id + 'unused', cna + 'basic_solar_heating_plate')
    //event.add(id + 'unused', cna + 'advanced_solar_heating_plate')
    event.add(id + 'unused', cna + 'thorium_ore')
    event.add(id + 'unused', cna + 'nuclear_fuel')
    event.add(id + 'unused', cna + 'thorium')
    event.add(id + 'unused', cna + 'radioactive_thorium')
})
