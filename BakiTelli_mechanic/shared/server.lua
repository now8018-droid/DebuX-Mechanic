local ESX = exports["es_extended"]:getSharedObject()

local function SaveVehicleProps(source, vehicleProps)
    if type(vehicleProps) ~= "table" or not vehicleProps.plate then
        return
    end

    local xPlayer = ESX.GetPlayerFromId(source)
    if not xPlayer then
        return
    end

    local selectQuery = ("SELECT `%s` FROM `%s` WHERE `%s` = @plate AND `%s` = @owner LIMIT 1")
        :format(Config.VehicleOwnerColumn, Config.VehicleTable, Config.VehiclePlateColumn, Config.VehicleOwnerColumn)
    local selectParams = {["@plate"] = vehicleProps.plate, ["@owner"] = xPlayer.identifier}
    local ownedVehicle = ExecuteSql(selectQuery, selectParams)
    if not ownedVehicle or not ownedVehicle[1] then
        return
    end

    local updateQuery = ("UPDATE `%s` SET `%s` = @vehicle WHERE `%s` = @plate AND `%s` = @owner")
        :format(Config.VehicleTable, Config.VehicleColumn, Config.VehiclePlateColumn, Config.VehicleOwnerColumn)
    local updateParams = {
        ["@vehicle"] = json.encode(vehicleProps),
        ["@plate"] = vehicleProps.plate,
        ["@owner"] = xPlayer.identifier
    }
    ExecuteSql(updateQuery, updateParams)
end

RegisterNetEvent("esx_vehicleshop:setVehicleOwnedPlayerId")
AddEventHandler("esx_vehicleshop:setVehicleOwnedPlayerId", function(vehicleProps)
    SaveVehicleProps(source, vehicleProps)
end)

-------------------------------- 

RegisterServerEvent("BakiTelli_mechanic:SaveVehicleProps")
AddEventHandler("BakiTelli_mechanic:SaveVehicleProps", function(vehicleProps)
	if Config.AutoSQLSave then 
        SaveVehicleProps(source, vehicleProps)
    end
end)

-------------------------------- 

function getMoney(src)
    local zrt = getplayer()
    local xPlayer = zrt(src)
    if not xPlayer then
        return 0
    end
    if Config.Money == "cash" then 
        money = xPlayer.getMoney()
    else 
        local bank = xPlayer.getAccount("bank")
        money = bank and bank.money or 0
    end
    return money
end

-------------------------------- 

function removeMoney(src, count)
    local zrt = getplayer()
    local xPlayer = zrt(src)
    if not xPlayer then
        return
    end
    if Config.Money == "cash" then 
        xPlayer.removeMoney(count)
    else
        xPlayer.removeAccountMoney("bank", count)
    end
end

-------------------------------- 

function getplayer(source)
	xPlayer = ESX.GetPlayerFromId
	return xPlayer
end

-------------------------------- 

function nofity(source,text)
    TriggerClientEvent("esx:showNotification", source, text)
end

-------------------------------- 

function getidentifier(xPlayer)
	hex = xPlayer.identifier
	return hex
end

-------------------------------- 

function ExecuteSql(query, params)
    local qParams = params or {}
    local IsBusy = true
    local result = nil
    exports.oxmysql:query(query, qParams, function(data)
        result = data
        IsBusy = false
    end)
    while IsBusy do
        Wait(0)
    end
    return result
end

------------------------------------------------------------------------------------

------------------------------------------------------------------------------------

-- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX --

------------------------------------------------------------------------------------
