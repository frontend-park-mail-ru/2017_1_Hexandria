function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = async function() {
    let main_hex = document.getElementById('hex');
    let minor_hex = document.getElementById('hex__minor_hex');
    let logo = document.getElementById('hex__title');
    let motto = document.getElementById('hex__motto');
    let buttons = document.getElementById('buttons');
    let registration = document.getElementById('registration');

    await sleep(4100);

    main_hex.style.opacity = "0";
    logo.style.opacity = "0";
    motto.style.opacity = "0";
    buttons.style.opacity = "0";
    registration.style.opacity = "0";

    hex.hidden = false;
    minor_hex.hidden = false;
    logo.hidden = false;
    motto.hidden = false;
    buttons.hidden = false;
    registration.hidden = false;

    for(let i = 0; i < 1; i += 0.01) {
        await sleep(25);
        main_hex.style.opacity = i.toString();
        logo.style.opacity = i.toString();
    }

    await sleep(1350);
    for(let i = 0; i < 1; i += 0.01) {
        await sleep(25);
        motto.style.opacity = i.toString();
    }

    await sleep(1350);
    for(let i = 0; i < 1; i += 0.01) {
        await sleep(25);
        registration.style.opacity = i.toString();
        buttons.style.opacity = i.toString();
    }
};