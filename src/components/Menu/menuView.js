import React from 'react';
import Modal from '../Modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { ClientMenuItemCard } from '../Cards';
import MenuDemoModal from '../Modals/MenuDemoModal';
import OrderConfirmScreen from './orderConfirmScreen';
import './style.css';

const MenuView = ({
  error,
  order,
  drinks,
  dishes,
  addItem,
  showModal,
  sendOrder,
  orderSent,
  deleteItem,
  getItemQty,
  currentItem,
  toggleModal,
  getItemCost,
  dataFetched,
  orderIsEmpty,
  businessName,
  confirmScreen,
  drinksIsEmpty,
  dishesIsEmpty,
  setCurrentItem,
  upgradeItemQty,
  handleFormInput,
  itemExistsInOrder,
  orderDishesIsEmpty,
  orderDrinksIsEmpty,
  toggleConfirmScreen,
}) => (
  <div className="menuView" id={orderSent && "noMargin"}>
    <div className="dashboardHeader">
      <h1>MENU</h1>
      <h3>{businessName}</h3>
    </div>

    {!orderSent && (
      <div className="menuHeader" id={confirmScreen && "menuHeaderConfirm"}>
        <h3>{confirmScreen ? "YOUR ORDER" : "MENU"}</h3>
        {!confirmScreen && <h3>{businessName}</h3>}
      </div>
    )}

    <div className="menuContainer">
      {/* FETCHING DATA SCREEN */}
      {!dataFetched && 
        <div id="fetchingData">
          <h3>FETCHING DATA...</h3>
        </div>
      }
      {/* FETCHING DATA SCREEN END */}
      {/* MAIN SCREEN */}
      {(!orderSent && !confirmScreen) && (
        <div className="client_menuItems">
          <div>
            {!drinksIsEmpty && ( 
              <>
              <h4>DRINKS</h4> 
              {drinks && drinks.map((item, idx) =>
                <ClientMenuItemCard 
                  key={idx}
                  idx={idx}
                  item={item}
                  type="drinks"
                  addItem={addItem}
                  getItemQty={getItemQty}
                  deleteItem={deleteItem}
                  currentItem={currentItem}
                  setCurrentItem={setCurrentItem}
                  upgradeItemQty={upgradeItemQty}
                  isInOrder={itemExistsInOrder(item.name, "drinks")}
                  isCurrentItem={(currentItem.type === 'drinks' && currentItem.idx === idx)}
                />
              )}
              </>
            )}
          </div>
          <div>
            {!dishesIsEmpty && (           
              <>
              <h4>DISHES</h4>
              {dishes && dishes.map((item, idx) =>    
                <ClientMenuItemCard 
                  key={idx}
                  idx={idx}
                  item={item}
                  type="dishes"
                  addItem={addItem}
                  deleteItem={deleteItem}
                  getItemQty={getItemQty}
                  currentItem={currentItem}
                  setCurrentItem={setCurrentItem}
                  upgradeItemQty={upgradeItemQty}
                  isInOrder={itemExistsInOrder(item.name, "dishes")}
                  isCurrentItem={(currentItem.type === 'dishes' && currentItem.idx === idx)}
                />   
              )}
              </>
            )}
          </div>
        </div>
      )}
      {/* MAIN SCREEN END */}
      {/* ORDER SUCCESS SCREEN */}
      {orderSent && (
        <div className="orderSent">
          <div>
            <h3>SUCCESS!</h3>
            <h4>YOUR ORDER HAS BEEN SENT</h4>
          </div>
          <div>
            <h4>TOTAL: ${order.cost}</h4>
          </div>
        </div>
      )}
      {/* ORDER SUCCESS SCREEN END */}
      {/* ERROR SCREEN */}
      {/* check different error messages */}
      {error && 
        <div id="menuView_error">
          <FontAwesomeIcon icon={faExclamationTriangle} size="4x"/>
          <h3>{error}</h3>
          <h3>PLEASE TRY AGAIN</h3>
        </div>
      }
      {/* ERROR SCREEN END */}
      {/* CONFIRM SCREEN */}
      {(confirmScreen && !orderSent) && (
        <OrderConfirmScreen 
          order={order}
          getItemCost={getItemCost}
          handleFormInput={handleFormInput}
          toggleConfirmScreen={toggleConfirmScreen}
          orderDrinksIsEmpty={orderDrinksIsEmpty}
          orderDishesIsEmpty={orderDishesIsEmpty}
        />
      )}
      {/* CONFIRM SCREEN  */}
      {!orderSent && (
        <div className="bottomNav" id={confirmScreen && "bottomNavConfirm"}>
          <div>
            <h4>TOTAL:</h4>
            <h4>${order.cost}</h4>
          </div>
          <div 
            onClick={confirmScreen ? () => sendOrder() : () => toggleConfirmScreen()}
            className={orderIsEmpty ? "btn btn_disabled" : "btn"}
          >
            {confirmScreen ? "CONFIRM" : "ORDER"}
          </div>
        </div>
      )}
    </div>
    {/* DEMO MODAL */}
    <Modal show={showModal}>
      <MenuDemoModal toggleModal={toggleModal} />
    </Modal>
    {/* DEMO MODAL END */}
  </div>
);

export default MenuView;