
import { AppContext } from '../context/AppContextProvider';
import React, { useContext, useEffect, useState } from 'react';


const RealatedDoc = ({ filterDoc }) => {
    const { doctors } = useContext(AppContext);
    const [relatedDoc, SetRelatedDoc] = useState([]);

    useEffect(() => {
        if (!filterDoc?.speciality) return;

        const related = doctors.filter((item) => item.speciality === filterDoc.speciality && item._id !== filterDoc._id);
        SetRelatedDoc(related);
    }, [doctors, filterDoc]);


 return (
    <div>
          <div className='text-center mt-5'>
               <h4>Related Doctors</h4>
               <p>Simply browse through our extensive list of trusted <br />doctors.</p>
          </div>
        <div className="d-flex flex-wrap gap-3">
            {relatedDoc.map((doc, idx) => (
                <div key={idx} className="card shadow-sm" style={{ width: '14rem' }}>
                    <img src={doc.image} className="card-img-top" alt={doc.name} />
                    <div className="card-body">
                         <p className="fw-medium mb-1" style={{color:"#22C55E"}}>Available</p>
                        <h5 className="card-title">{doc.name}</h5>
                        <p className="card-text mb-1"><small className="text-muted">{doc.speciality}</small></p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);   }
        // </div>

export default RealatedDoc;
