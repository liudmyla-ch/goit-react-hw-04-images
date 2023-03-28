import React, { useState, useEffect } from 'react';
import ImageGallery from './image-gallery/ImageGallery';
import Modal from './modal/Modal';
import Searchbar from './searchbar/Searchbar';

export const App = () => {
  const [value, setValue] = useState('');
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState('1');
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [alt, setAlt] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://pixabay.com/api/?key=33165254-c3e62d75cf9018f52b0cf66fd&q='${value}'&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`
    )
      .then(res => res.json())
      .then(data => {
        const collection = data.hits;
        setCollection(prevState => [...prevState, ...collection]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [value, page]);

  const onLoadMore = () => {
    setPage(page + 1);
  };

  const onOpenModal = evt => {
    const { alt } = evt.target;
    const modalImg = evt.target.dataset.large;
    setModalImg(modalImg);
    setAlt(alt);
    setShowModal(true);
  };
  const onCloseModal = () => {
    setShowModal(false);
  };

  const onSubmitForm = value => {
    setValue(value);
    setPage(1);
    setCollection([]);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmitForm} />
      {collection.length > 0 && (
        <ImageGallery
          gallery={collection}
          spinner={loading}
          onLoadNextPage={onLoadMore}
          onOpenModal={onOpenModal}
        />
      )}
      {showModal && (
        <Modal largeImg={modalImg} alt={alt} onClose={onCloseModal} />
      )}
    </>
  );
};
