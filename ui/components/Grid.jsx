import React, { useState } from "react";
import { useFetchAllCats } from "../hooks/cats";
import { Responsive, WidthProvider } from "react-grid-layout";
import ReactModal from "react-modal";
import styles from "../styles/Grid.module.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

export const GridComponent = () => {
  const data = useFetchAllCats();
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setShowPhoto] = useState(undefined);

  if (!data) return <div>Loading...</div>;

  var layout = [
    { i: "bank-draft", x: 0, y: 0, w: 1, h: 1 },
    { i: "bill-of-lading", x: 1, y: 0, w: 1, h: 1 },
    { i: "invoice", x: 2, y: 0, w: 1, h: 1 },
    { i: "bank-draft-2", x: 0, y: 1, w: 1, h: 1 },
    { i: "bill-of-lading-2", x: 1, y: 1, w: 1, h: 1 },
  ];

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = (type) => {
    setShowModal(true);
    setShowPhoto(type);
  };

  if (showModal) {
    return (
      <ReactModal
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={true}
        isOpen={showModal}
        ariaHideApp={false}
        className={styles.Modal}
        overlayClassName={styles.Overlay}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: 600, height: 650 }}
            src={`/cats/${selectedPhoto}.png`}
            alt={selectedPhoto}
          />
        </div>
      </ReactModal>
    );
  }

  return (
    <div style={{ width: 800 }}>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 400 }}
        cols={{ lg: 3 }}
        rowHeight={250}
        isBounded={true}
      >
        {data.map((cat) => (
          <div key={cat.type} style={{ cursor: 'pointer' }} onClick={() => handleOpenModal(cat.type)}>
            <p>{cat.title}</p>
            <img
              style={{ width: 200, height: 200 }}
              src={`/cats/${cat.type}.png`}
              alt={cat.title}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};
