AddEventHandler("BakiTelli_mechanic:buyitem")
RegisterNetEvent("BakiTelli_mechanic:buyitem", function (price)
    if getMoney(source) >= price then 
        removeMoney(source, price)
        TriggerClientEvent("BakiTelli_mechanic:cl:buyitem", source)
    else 
        nofity(source, Config.Langs["NoPrice"])
    end
end)