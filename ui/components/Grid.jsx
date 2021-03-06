import React, { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import ReactModal from "react-modal";
import isEqual from "lodash.isequal";
import throttle from "lodash.throttle";
import { ONE_SECOND } from "../constants";

import { useFetchAllPosts } from "../hooks/posts";
import { updatePost } from "../services/posts";
import styles from "../styles/Grid.module.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

export const GridComponent = () => {
  // attributes
  const data = useFetchAllPosts();

  const [showModal, setShowModal] = useState(false);

  const [layout, setLayout] = useState([]);

  const [selectedPhoto, setShowPhoto] = useState(undefined);

  // methods
  const generateLayout = data?.map((d) => ({
    i: d.type,
    x: d.x,
    y: d.y,
    w: 1, // default
    h: 1, // default
  }));

  const handleCloseModal = () => setShowModal(false);

  const handleOpenModal = (type) => {
    setShowModal(true);
    setShowPhoto(type);
  };

  const updateLayout = async (newItem) => {
    const body = {
      type: newItem.i,
      x: newItem.x,
      y: newItem.y,
    };
    await updatePost(body);
  };

  const onDragStop = (_, oldItem, newItem) => {
    if (showModal === false) {
      if (!isEqual(oldItem, newItem)) {
        updateLayout(newItem);
      }
    }
  };

  useEffect(() => {
    if (Array.isArray(data)) {
      setLayout(generateLayout);
    }
  }, [data]);

  // rendering views
  if (!data) return <div>Loading...</div>;

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
        onDragStop={throttle(onDragStop, ONE_SECOND, {
          leading: false,
          trailing: true,
        })}
      >
        {data.map((cat) => (
          <div
            key={cat.type}
            style={{ cursor: "pointer" }}
            onClick={() => handleOpenModal(cat.type)}
          >
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
