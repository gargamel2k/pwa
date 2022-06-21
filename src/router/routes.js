const routes = [{
        path: '/',
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [{
                path: '',
                component: () =>
                    import ('pages/Home.vue')
            },
            {
                path: 'cartas',
                component: () =>
                    import ('pages/Cartas.vue')
            },
            {
                path: 'expedientes',
                component: () =>
                    import ('pages/Expedientes.vue')
            },
            {
                path: 'recursos',
                component: () =>
                    import ('pages/Recursos.vue')
            },
            {
                path: 'dashboard',
                component: () =>
                    import ('pages/Dashboard.vue')
            },
            {
                path: 'help',
                component: () =>
                    import ('pages/Ayuda.vue')
            },

            {
                path: 'det_carta',
                name: "det_carta",
                component: () =>
                    import ('pages/DetalleCarta.vue')
            },
            {
                path: 'det_expediente',
                name: "det_expediente",
                component: () =>
                    import ('pages/DetalleExpediente.vue')
            }

        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () =>
            import ('pages/ErrorNotFound.vue')
    }
]

export default routes
