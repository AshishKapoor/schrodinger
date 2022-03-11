import React from "react";
import useSwr from "swr";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

export const GridComponent = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSwr("api/cats", fetcher);

  if (error) return <div>Failed to load users</div>;
  if (!data) return <div>Loading...</div>;

  var layout = [
    { i: "bank-draft", x: 0, y: 0, w: 1, h: 1 },
    { i: "bill-of-lading", x: 1, y: 0, w: 1, h: 1 },
    { i: "invoice", x: 2, y: 0, w: 1, h: 1 },
    { i: "bank-draft-2", x: 0, y: 1, w: 1, h: 1 },
    { i: "bill-of-lading-2", x: 1, y: 1, w: 1, h: 1 }
  ];

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
          <div key={cat.type} onClick={() => console.log(cat.title)}>
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
