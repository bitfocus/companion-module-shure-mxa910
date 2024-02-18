module.exports = async function (self) {

    let variableDefinitions = [
        { variableId: 'deviceid', name: 'Device ID' },
        { variableId: 'firmware_version', name: 'Firmware Version' },
        { variableId: 'flash_state', name: 'Flash State' },
        { variableId: 'gateway_audio_primary', name: 'Gateway Audio Primary' },
        { variableId: 'ipaddress_audio_primary', name: 'IP Address Audio Primary' },
        { variableId: 'last_command_received',	name: 'Last Command Received' },
        { variableId: 'last_command_sent',	name: 'Last Command Sent' },
        { variableId: 'model',name: 'Model' },
        { variableId: 'preset_active',	name: 'Active Preset' },
        { variableId: 'serial_number', name: 'Serial Number' },
        { variableId: 'subnet_audio_primary', name: 'Subnet Audio Primary' },
    ]

    for (let i = 1; i <= self.channelcount; i++) {
		variableDefinitions.push({ variableId: `channel_name_${i}`, name: `Channel ${i} Name` })
		variableDefinitions.push({ variableId: `channel_mute_${i}`, name: `Channel ${i} Mute` })
	}

	for (let i = 1; i <= 10; i++) {
		variableDefinitions.push({ variableId: `preset_name_${i}`, name: `Preset ${i} Name` })
	}
	self.setVariableDefinitions(variableDefinitions)
}