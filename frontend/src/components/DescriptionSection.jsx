const DescriptionSection = ({header, content}) => {
    return (
        <div>
            <p className="text-[#007bff] text-2xl font-semibold">{header}</p>
            <p>{content}</p>
        </div>
    );
}

export default DescriptionSection;
