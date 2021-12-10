import React, { useContext, useEffect } from "react";
import { Container,Row ,Col} from "react-bootstrap";
import { GlobalContext } from "../context/GlobalState";
import Pagination from "./Pagination";
import TransactionsList from "./TransactionsList";
import DisplayMonetary from "./DisplayMonetary";

export const GetAllTransactions = () => {

  const { transactions, getTransactions } = useContext(GlobalContext);


  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTransactions]);



  return (
    
       <Container >
         <Row>

        
         <Col md={4}  className="my-4 bg-glass">
            {transactions.length > 0 ? (
              <>
                <Pagination
                  data={transactions}
                  RenderComponent={TransactionsList}
                  title="Transactions"
                  pageLimit={3}
                  dataLimit={4}
                  
                />
              </>
            ) : (
            <h5 className="p-3">No Transactions</h5> 
            )}
            </Col>
             <Col md={8}   className="my-4 ">
               <DisplayMonetary />
             </Col>
              </Row>
    </Container>
 
   
  );
};
