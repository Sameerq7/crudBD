import {
    PostFunc as PostFuncRepo,
    PostImageUsingMulterFunc as PostImageUsingMulterFuncRepo

} from '../../repos/postFuncs/EntryFile.js';

let PostFunc = async (req, res) => {
    let LocalBody = req.body;

    let LocalFromRepo = await PostFuncRepo({ ...LocalBody });

    if (LocalFromRepo.KTF === false) {
        res.status(500).send(LocalFromRepo.KReason);
        return;
    };

    res.status(200).send(LocalFromRepo.pk.toString());
};
let PostImageUsingMulterFunc = async (req, res) => {
    let LocalBody = req.body;

    let LocalFromRepo = await PostImageUsingMulterFuncRepo({ ...LocalBody });

    if (LocalFromRepo.KTF === false) {
        res.status(500).send(LocalFromRepo.KReason);
        return;
    };

    res.status(200).send(LocalFromRepo.pk.toString());
};
export {
    PostFunc, PostImageUsingMulterFunc
};