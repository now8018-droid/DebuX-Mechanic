local QBCore = exports['qb-core']:GetCoreObject()

RegisterNetEvent('qb-vehicletuning:server:SaveVehicleProps', function(vehicleProps)
    ExecuteSql("UPDATE `player_vehicles` SET mods = '"..json.encode(vehicleProps).."' WHERE plate = '"..vehicleProps.plate.."'")
end)

-------------------------------- 

RegisterServerEvent('BakiTelli_mechanic:SaveVehicleProps')
AddEventHandler('BakiTelli_mechanic:SaveVehicleProps', function(vehicleProps)
	if Config.AutoSQLSave then 
        ExecuteSql("UPDATE `player_vehicles` SET mods = '"..json.encode(vehicleProps).."' WHERE plate = '"..vehicleProps.plate.."'")
    end
end)

-------------------------------- 

function getMoney(src)
    local zrt = getplayer()
    local xPlayer = zrt(src)	
    if Config.Money == "cash" then 
        money = xPlayer.PlayerData.money["cash"]
    else 
        money = xPlayer.PlayerData.money["bank"]
    end
    return money
end

-------------------------------- 

function removeMoney(src, count)
    local zrt = getplayer()
    local xPlayer = zrt(src)	
    if Config.Money == "cash" then 
        xPlayer.Functions.RemoveMoney('cash', count, "Bank depost")
    else
        xPlayer.Functions.RemoveMoney('bank', count, "Bank depost")
    end
end

-------------------------------- 

function getplayer(source)
	xPlayer = QBCore.Functions.GetPlayer
	return xPlayer
end

-------------------------------- 

function nofity(source,text)
    TriggerClientEvent('QBCore:Notify', source, text)
end

-------------------------------- 

function getidentifier(xPlayer)
	hex = xPlayer.PlayerData.citizenid
	return hex
end

-------------------------------- 

function ExecuteSql(query)
    local IsBusy = true
    local result = nil
    if Config.Mysql == "oxmysql" then
        if MySQL == nil then
            exports.oxmysql:execute(query, function(data)
                result = data
                IsBusy = false
            end)
            -------------------------------- 
        else
            MySQL.query(query, {}, function(data)
                result = data
                IsBusy = false
            end)
        end
        -------------------------------- 
    elseif Config.Mysql == "ghmattimysql" then
        exports.ghmattimysql:execute(query, {}, function(data)
            result = data
            IsBusy = false
        end)
    elseif Config.Mysql == "mysql-async" then   
        MySQL.Async.fetchAll(query, {}, function(data)
            result = data
            IsBusy = false
        end)
        -------------------------------- 
    end
    while IsBusy do
        Citizen.Wait(0)
    end
    return result
end

------------------------------------------------------------------------------------

------------------------------------------------------------------------------------

-- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX --

------------------------------------------------------------------------------------