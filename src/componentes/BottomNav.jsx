import React from "react";
import "./BottomNav.css";

export default function BottomNav() {
    return (
        <nav className="bottom-nav">

            {/* Item 1 a, casinha (Home) */}
                  <div className="nav-item active">

            {/* Ícone de "home" (usando Google Material Icons) */}
                 <span className="material-icons">home</span>
            {/* Texto abaixo do ícone */}
                 <p>Início</p>
                  </div>

            {/* Item 2, Promoções */}
            <div className="nav-item">
            <span className="material-icons">local_offer</span>
            <p>Promoções</p>
            </div>

      {/* Item 3 - Agendas */}
      <div className="nav-item">
      <span className="material-icons">event</span>
      <p>Agendas</p>
      </div>

{/* Item 4 - Perfil */}
<div className="nav-item">
<span className="material-icons">person</span>
<p>Perfil</p>
</div>         

        </nav>
    );
}
