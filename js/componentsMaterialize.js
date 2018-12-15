
$componentsMaterialize = new Object();

activarLabel = (obj)=>
{
    $($("#"+obj)[0]["labels"][0]).addClass("active");
}

desactivarLabel = (obj)=>
{
    $($("#"+obj)[0]["labels"][0]).removeClass("active");
}

$componentsMaterialize["activarLabel"] = activarLabel;
$componentsMaterialize["desactivarLabel"] = desactivarLabel;