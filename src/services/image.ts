import { getPlaiceholder } from 'plaiceholder';

const getImage = async (postId: string) => {
  const src = `https://via.assets.so/furniture.png?id=${postId}&q=95&w=320&h=320&fit=fill`
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer()));

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};

export { getImage };