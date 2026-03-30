AddEventHandler("BakiTelli_mechanic:buyitem")
RegisterNetEvent("BakiTelli_mechanic:buyitem", function (price)
    local playerSource = source
    local itemPrice = tonumber(price) or 0
    if itemPrice <= 0 then
        return
    end
    if getMoney(playerSource) >= itemPrice then 
        removeMoney(playerSource, itemPrice)
        TriggerClientEvent("BakiTelli_mechanic:cl:buyitem", playerSource)
    else 
        nofity(playerSource, Config.Langs["NoPrice"])
    end
end)
