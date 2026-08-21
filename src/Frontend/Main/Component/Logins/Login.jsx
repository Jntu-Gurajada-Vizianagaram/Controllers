
const mods = {
    get uds() {
        try {
            return JSON.parse(localStorage.getItem("accesser")) || {};
        } catch {
            return {};
        }
    },
}

export default mods;
