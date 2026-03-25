router.post("/", async (req, res) => {
    try {
        const { titulo, data, local, descricao, capacidade_total, status, mapa_url } = req.body;

        if (!titulo || !data|| !local || !descricao || !capacidade_total) {
            return res.status(400).json({ error: "Preencha todos os campos obrigatórios" });
        }

        const r = await pool.query(
            `INSERT INTO eventos (titulo, data, local, descricao, capacidade_total, status, mapa_url)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [titulo, data, local, descricao, capacidade_total, status ?? 'aberto', mapa_url ?? null]
        );

        return res.status(201).json(r.rows[0]);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
}); 