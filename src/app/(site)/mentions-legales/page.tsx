import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales et informations juridiques de DX Facilities.",
};

export default function MentionsLegalesPage() {
  return (
    <section className="dx-section bg-dx-paper">
      <Container>
        <div className="max-w-text mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h1 className="dx-h1 text-dx-navy-500">Mentions légales</h1>
            <p className="dx-caption text-dx-steel-500">
              Dernière mise à jour : mai 2026
            </p>
          </div>

          {[
            {
              title: "Éditeur du site",
              content: (
                <p className="dx-body text-dx-steel-600">
                  <strong className="text-dx-navy-700">DX Facilities</strong>
                  <br />
                  Filiale de DEXTERA GROUP
                  <br />
                  Rte de l'aéroport, lot N°88106, Yoff ONOMO, Dakar — Sénégal
                  <br />
                  Téléphone : +221 33 843 14 64
                  <br />
                  Email : info@dxfacilities.com
                </p>
              ),
            },
            {
              title: "Directeur de la publication",
              content: (
                <p className="dx-body text-dx-steel-600">
                  Mamadou Ndiaye, CEO DX Facilities
                </p>
              ),
            },
            {
              title: "Hébergement",
              content: (
                <p className="dx-body text-dx-steel-600">
                  Ce site est hébergé par Vercel Inc., 340 Pine Street, Suite
                  900, San Francisco, CA 94104, États-Unis.
                </p>
              ),
            },
            {
              title: "Propriété intellectuelle",
              content: (
                <p className="dx-body text-dx-steel-600">
                  L'ensemble du contenu de ce site (textes, images, logos,
                  visuels) est la propriété exclusive de DX Facilities et de
                  DEXTERA GROUP. Toute reproduction, représentation,
                  modification ou exploitation, totale ou partielle, est
                  interdite sans autorisation préalable écrite.
                </p>
              ),
            },
            {
              title: "Données personnelles",
              content: (
                <p className="dx-body text-dx-steel-600">
                  Les informations collectées via le formulaire de contact sont
                  utilisées exclusivement pour traiter votre demande et vous
                  recontacter. Elles ne sont ni cédées, ni vendues à des tiers.
                  Conformément à la loi sénégalaise n° 2008-12 sur la
                  protection des données à caractère personnel, vous disposez
                  d'un droit d'accès, de rectification et de suppression de vos
                  données en nous contactant à info@dxfacilities.com.
                </p>
              ),
            },
            {
              title: "Cookies",
              content: (
                <p className="dx-body text-dx-steel-600">
                  Ce site n'utilise pas de cookies de traçage ou publicitaires.
                  Des cookies techniques strictement nécessaires au
                  fonctionnement du site peuvent être déposés.
                </p>
              ),
            },
          ].map((section) => (
            <div
              key={section.title}
              className="flex flex-col gap-3 border-t border-dx-steel-100 pt-8"
            >
              <h2 className="dx-h3 text-dx-navy-500">{section.title}</h2>
              {section.content}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
