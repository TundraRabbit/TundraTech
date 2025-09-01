// priority: 0

// Visit the wiki for more info - https://kubejs.com/

Platform.mods.kubejs.name = 'TundraTech'

let id = "tundratech:"

StartupEvents.registry('item', event => {

    let mechanism = [
        "Simple",
        "Steam"
    ]

    mechanism.forEach( type => {

        event.create(id + type.toLowerCase() + '_mechanism')
        .texture(id + 'item/' + type.toLowerCase() + '_mechanism')
        .displayName( type + ' Mechanism')

        event.create(id + 'incomplete_' + type.toLowerCase() + '_mechanism', 'create:sequenced_assembly')
        .texture(id + 'item/incomplete_' + type.toLowerCase() + '_mechanism')
        .displayName('Incomplete ' + type + ' Mechanism')

    })
})
