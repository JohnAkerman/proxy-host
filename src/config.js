const DEFAULT_CONFIG = {
    port: 3001,
    save_file: 'projects.json',
    verbose_project_list: false // This is used whether to also display things such as qr, overrides, browser abilities
}

const config = Object.assign(DEFAULT_CONFIG);

export {
    config,
}