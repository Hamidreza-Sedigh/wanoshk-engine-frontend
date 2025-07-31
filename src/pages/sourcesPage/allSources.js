import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';
import { Container, Table, Button  } from 'reactstrap';

const EditableCell = ({ value, onSave }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [val, setVal] = React.useState(value);

  const isBoolean = typeof value === 'boolean';

  const handleBlur = () => {
    setIsEditing(false);
    const finalValue = isBoolean ? Boolean(val) : val;
    if (finalValue !== value) {
      onSave(finalValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleBlur();
    if (e.key === 'Escape') {
      setIsEditing(false);
      setVal(value); // برگشت به مقدار قبلی
    }
  };

  return (
    <td onClick={() => setIsEditing(true)} style={{ cursor: 'pointer' }}>
      {isEditing ? (
        isBoolean ? (
          <input
            type="checkbox"
            checked={val === true || val === 'true'}
            onChange={(e) => {
              setVal(e.target.checked);
              onSave(e.target.checked);
              setIsEditing(false);
            }}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        )
      ) : (
        isBoolean ? (value ? '✔️' : '❌') : val
      )}
    </td>
  );
};


export default function SourcesPage({history}){

    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedSource, setSelectedSource] = useState('');
    const [sources, setSources] = useState([]);
    const user = localStorage.getItem('user');

    useEffect(()=>{
        getSources();
        getDistinct();
    },[]);

    useEffect(()=>{
        // وقتی selectedSource تغییر کرد:
        if (selectedSource) {
            getOneSource(selectedSource);
        } else {
            getSources();
        }
    },[selectedSource]);

    const toggleSourceStatus = async (sourceId, currentStatus) => {
        try {
            const url = `/api/sources/toggle-status`
            const response = await api.put(url,{id: sourceId,enable: !currentStatus}, { headers: { user: user }});
            console.log("**response in toggle:", response);
            if (response.status === 200) {
                console.log("**if ejra shod");
                
                // به روزرسانی تنها منبع تغییر کرده در لیست sources
                setSources(prevSources => 
                    prevSources.map(source => 
                    source._id === sourceId 
                        ? { ...source, enable: response.data.enable } 
                        : source
                    )
                )
            } else {
                console.log("**else ejra shod");
                console.error('خطا در تغییر وضعیت');
            }
        } catch (error) {
            console.error('خطا در ارتباط با سرور:', error);
        }
        };
    const getSources = async(filter) => {
        try {
            const url = `/getAllSources`
            const response = await api.get(url, { headers: { user: user }})
            //console.log("response:", response.data);
            setSources(response.data.sources)
        } catch (error) {
            // history.push('/login');
            console.error('خطا در دریافت منابع:', error);

        }
    };

    const getDistinct = async(filter) => {
        try {
            const url = `/getDistinctSources`
            const response = await api.get(url, { headers: { user: user }})
            // console.log("response:", response.data);
            setDropdownOptions(response.data.sources)
        } catch (error) {
            console.error('خطا در دریافت منابع:', error);
        }
    };

    const getOneSource = async() => {
        try {
            const url = `/getOneSource/${encodeURIComponent(selectedSource)}`;
            console.log("selectedSource:", selectedSource);
            const response = await api.get(url, { headers: { user: user }})
            console.log("response:", response.data);
            setSources(response.data.sources)
        } catch (error) {
            //history.push('/login');
            console.error('خطا در دریافت منابع:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('آیا از حذف این سورس مطمئن هستید؟')) return;
        try {
            await api.delete(`/api/sources/${id}`, { headers: { user } });
            setSources(prev => prev.filter(source => source._id !== id));
        } catch (err) {
            console.error('خطا در حذف:', err);
            alert('خطایی در حذف رخ داد.');
        }
    };

    const handleEdit = async (id, field, value) => {
        try {
            const res = await api.put(`/api/sources/${id}`, { [field]: value }, { headers: { user } });
            if (res.status === 200) {
            setSources(prev =>
                prev.map(src =>
                src._id === id ? { ...src, [field]: value } : src
                )
            );
            }
        } catch (err) {
            console.error('خطا در ویرایش:', err);
            alert('خطایی در ویرایش رخ داد.');
        }
    };


    
    return(
        <div>
            <div className="mb-4">
            <label className="block mb-1 font-medium">انتخاب منبع:</label>
            <select
                className="w-full p-2 border rounded"
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                >
                <option value="">همه منابع</option>
                {dropdownOptions.map((name, index) => (
                    <option key={index} value={name}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
            <h2>all sources:</h2>
            <div className="table">
                {/* <Table striped hover responsive bordered borderless  size="sm"> */}
                <Table striped hover responsive size="sm">
                <thead>
                    <tr className="table-dark">
                    <th></th>
                    <th>sourceName</th>
                    <th>En</th>
                    <th>enable</th>
                    <th>siteAddress</th>
                    <th>rssURL</th>
                    <th>tagClassName</th>
                    <th>cutAfter</th>
                    <th>removeTags</th>
                    <th>secondTag</th>
                    <th>isLocalImg</th>
                    <th>isCategorized</th>
                    <th>category</th>
                    <th>subCategory</th>
                    <th>lastTimeFetch</th>
                    <th>status</th>
                    <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {sources.map((s, idx) => (
                    <tr key={s._id}>
                        <td><Button size="sm" color="danger" onClick={() => handleDelete(s._id)}>🗑 حذف</Button></td>
                        <EditableCell value={s.sourceName} onSave={(val) => handleEdit(s._id, 'sourceName', val)} />
                        <EditableCell value={s.sourceNameEn} onSave={(val) => handleEdit(s._id, 'sourceNameEn', val)} />
                        <td onClick={() => toggleSourceStatus(s._id, s.enable)} style={{ cursor: 'pointer' }}>{s.enable ? 'yep' : 'no'} </td>
                        <EditableCell value={s.siteAddress} onSave={(val) => handleEdit(s._id, 'siteAddress', val)} />
                        <EditableCell value={s.rssURL} onSave={(val) => handleEdit(s._id, 'rssURL', val)} />
                        <EditableCell value={s.tagClassName} onSave={(val) => handleEdit(s._id, 'tagClassName', val)} />
                        
                        <td > {s.cutAfter} </td>
                        <td > {s.removeTags} </td>
                        <EditableCell value={s.secondTag} onSave={(val) => handleEdit(s._id, 'secondTag', val)} />
                        <EditableCell value={s.isLocalImg} onSave={(val) => handleEdit(s._id, 'isLocalImg', val)} />
                        <td > {s.isCategorized?'yes':'no'} </td>
                        <td > {s.category} </td>
                        <td > {s.subCategory} </td>
                        <td > {s.lastTimeFetch} </td>
                        <td > {s.status} </td>
                        <td > {s._id} </td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </div>
            
        </div>
    );

}
