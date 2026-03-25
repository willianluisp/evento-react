router.post("/", async (req, res) => {
    try {
        const { titulo, data, local, descricao, status, capacidade_total, mapa_url } = req.body;

        if (!titulo || !data || !local || !descricao || !status || !capacidade_total || !mapa_url) {
            return res.status(400).json({ erro: "Preencha todos os campos" });
        }

        const r = await pool.query(
            `INSERT INTO eventos 
                (titulo, data, local, descricao, status, capacidade_total, mapa_url)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [titulo, data, local, descricao, status, Number(capacidade_total), mapa_url ?? null]
        );

        res.status(201).json(r.rows[0]);

    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar evento", detalhe: error.message });
    }
}); // <-- fechar o router.post